import os
import json

# Define the directory containing the vocals
vocals_dir = 'public/vocals'

# Initialize a dictionary to hold the data
vocals_data = {}

# Walk through the vocals directory
for root, dirs, files in os.walk(vocals_dir):
    for dir in dirs:
        person_dir = os.path.join(root, dir)
        # List to hold the files for this person
        person_files = []
        for file in os.listdir(person_dir):
            if file.endswith('.mp3'):
                # Add the file to the person's list
                person_files.append(file)
        # Add the person's files to the main dictionary
        vocals_data[dir] = person_files

# Generate the JS file content with ensure_ascii=False to preserve Unicode characters
js_content = f'const vocals = {json.dumps(vocals_data, ensure_ascii=False, indent=2)};\nexport default vocals'

# Write the content to vocals.js
with open('src/vocals.js', 'w', encoding='utf-8') as js_file:
    js_file.write(js_content)

print('vocals.js has been generated successfully.')
