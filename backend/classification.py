import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from sklearn.utils.class_weight import compute_class_weight
from preprocessing import prep_total_pipeline  # Import preprocessing module

# 🔄 Dataset Path
DATASET_PATH = "./imgs"
species_names = sorted([d for d in os.listdir(DATASET_PATH) if os.path.isdir(os.path.join(DATASET_PATH, d))])
NUM_CLASSES = len(species_names)

# 🔄 Load Preprocessed Dataset Train & Test Data 
folder_list = [os.path.join(DATASET_PATH, species) for species in species_names]
X_train, X_test, y_train, y_test, species_names = prep_total_pipeline(
    folder_list,
    size=224
)

# Convert labels to categorical (one-hot encoding)
y_train = tf.keras.utils.to_categorical(y_train, NUM_CLASSES)
y_test = tf.keras.utils.to_categorical(y_test, NUM_CLASSES)

# 🔥 Compute Class Weights (for Handling Imbalance)
class_weights = compute_class_weight('balanced', classes=np.unique(y_train.argmax(axis=1)), y=y_train.argmax(axis=1))
class_weight_dict = {i: class_weights[i] for i in range(NUM_CLASSES)}
print("📊 Class Weights:", class_weight_dict)

# 🔥 Load Pretrained Model
base_model = DenseNet121(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# 🔥 Add Custom Layers
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(512, activation='relu')(x)
x = Dense(NUM_CLASSES, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=x)

# 🔥 Step 1: Train Only New Layers
for layer in base_model.layers:
    layer.trainable = False

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=5, batch_size=32, validation_split=0.2, class_weight=class_weight_dict)

# 🔥 Step 2: Fine-Tune Last 50 Layers
for layer in base_model.layers[-50:]:
    layer.trainable = True

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5), loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2, class_weight=class_weight_dict)

# ✅ Save Model
model.save("wood_species_model1.h5")

# 🔥 Evaluate Model on Test Data
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f"🌟 Final Test Accuracy: {test_accuracy:.2%}")