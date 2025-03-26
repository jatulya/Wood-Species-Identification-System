import os
DATASET_PATH = "./imgs"
species_names = sorted([d for d in os.listdir(DATASET_PATH) if os.path.isdir(os.path.join(DATASET_PATH, d))])
print(species_names)
print(len(species_names))
