import cv2
import numpy as np
import os
from os.path import isfile, join
from os import listdir
from tensorflow.keras.applications.densenet import preprocess_input  
from sklearn.model_selection import train_test_split  

# Create directory if not exists
def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

# Load images from folder
def load_image_folder(filepath, target_size=(224, 224), limit=None):
    onlyfiles = [f for f in listdir(filepath) if isfile(join(filepath, f)) and f.endswith('.jpg')]
    print(f"📂 Loading images from {filepath}... Found {len(onlyfiles)} images.")

    num_files = min(limit, len(onlyfiles)) if limit else len(onlyfiles)
    print(f"✅ Processing {num_files} images...")

    images = []
    for n in range(num_files):
        img = cv2.imread(join(filepath, onlyfiles[n]))  
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  
        img = cv2.resize(img, target_size)  
        images.append(img)

    return np.array(images)

# Crop images into smaller patches
def crop_image(image, size):
    image_list = []
    height, width = image.shape[:2]
    height_slices, width_slices = height // size, width // size

    for i in range(height_slices):
        for j in range(width_slices):
            crop_img = image[i * size:(i + 1) * size, j * size:(j + 1) * size]
            image_list.append(crop_img)

    return image_list

def crop_image_list(image_list, size):
    return [crop for img in image_list for crop in crop_image(img, size)]

# Rotate images (Augmentation)
def rotate_images_4x(image_list):
    new_images = []
    for img in image_list:
        new_images.append(img)  
        for _ in range(3):
            img = np.rot90(img)
            new_images.append(img)
    return new_images

# Mirror images (Augmentation)
def mirror_images(image_list):
    return [img for i in image_list for img in (i, np.fliplr(i))]

# Save test images to folder
def save_test_images(image_list, labels, species_names, test_dir="test_images/"):
    create_directory(test_dir)
    for i, (img, label) in enumerate(zip(image_list, labels)):
        species = species_names[label]
        species_folder = join(test_dir, species)
        create_directory(species_folder)
        cv2.imwrite(join(species_folder, f"test_{i}.jpg"), cv2.cvtColor(img, cv2.COLOR_RGB2BGR)) 

# Full preprocessing pipeline
def prep_pipeline(folder, size):
    images = load_image_folder(folder, target_size=(size, size))
    cropped = crop_image_list(images, size)
    rotated = rotate_images_4x(cropped)
    mirrored = mirror_images(rotated)

    # 🔥 Normalize for Pretrained Model 🔥
    normalized_images = np.array([preprocess_input(img) for img in mirrored])

    return normalized_images

# Process dataset & split into train/test
def prep_total_pipeline(folder_list, size, limit=None, test_split=0.2):
    X, y = [], []
    species_names = [os.path.basename(folder) for folder in folder_list]

    for idx, folder in enumerate(folder_list):
        print(f"\n📂 Processing folder {idx + 1}/{len(folder_list)}: {folder}")
        images = prep_pipeline(folder, size)

        labels = np.full(len(images), idx)  
        X.append(images)
        y.append(labels)

    X = np.vstack(X)
    y = np.concatenate(y)

    # 🔥 Splitting Train/Test Data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_split, stratify=y, random_state=42)

    # 🔥 Save Test Images
    save_test_images(X_test, y_test, species_names)

    print(f"\n✅ Final dataset: X_train={X_train.shape}, X_test={X_test.shape}, y_train={y_train.shape}, y_test={y_test.shape}")
    return X_train, X_test, y_train, y_test, species_names
