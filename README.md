# make-font-pix2pix-tensorflow



memo
```
convert -font GLT-GonunneObsolete.otf -pointsize 256 label:'あ' あ.jpg
convert -thumbnail 256x256! あ.jpg _あ.png
mogrify    -resize    (width)x(height)    <変換前の画像名>
identify -format "%[mean]" diff.jpg
0（黒）〜65535（白）
convert +append 画像1 画像2 画像3 出力画像

python pix2pix.py \
  --mode train \
  --output_dir lastour_train \
  --max_epochs 200 \
  --input_dir lastour/train \
  --which_direction BtoA

python tools/process.py \
  --input_dir test \
  --operation resize \
  --output_dir resized-test

python tools/process.py \
  --input_dir resized-left \
  --b_dir resized-right \
  --operation combine \
  --output_dir left-right

python train.py --dataroot ./facades --name facades_pix2pix --model pix2pix --direction BtoA


python pix2pix.py \
  --mode test \
  --output_dir lastour_test \
  --input_dir lastour/val \
  --checkpoint lastour_train
```
