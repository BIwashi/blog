
for file in *.jpg; 
do 
    filename="${file%.*}"
    cwebp -q 80 -metadata icc -sharp_yuv "$file" -o "$filename.webp"; 
done
