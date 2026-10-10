"""Sintetiza falas com Piper (offline) e salva em MP3.
Uso: python scripts/piper_mp3.py jobs.json pasta_das_vozes
"""
import io
import json
import os
import sys
import wave

import lameenc
from piper import PiperVoice, SynthesisConfig

jobs = json.load(open(sys.argv[1], encoding="utf-8"))
vozes_dir = sys.argv[2]
carregadas = {}

for j in jobs:
    voz = carregadas.get(j["voz"])
    if voz is None:
        voz = PiperVoice.load(os.path.join(vozes_dir, j["voz"] + ".onnx"))
        carregadas[j["voz"]] = voz
    cfg = SynthesisConfig(length_scale=j["lento"], noise_scale=0.6, noise_w_scale=0.8)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        voz.synthesize_wav(j["texto"], w, syn_config=cfg)
    buf.seek(0)
    with wave.open(buf, "rb") as r:
        pcm = r.readframes(r.getnframes())
        sr, ch = r.getframerate(), r.getnchannels()
    enc = lameenc.Encoder()
    enc.set_bit_rate(64)
    enc.set_in_sample_rate(sr)
    enc.set_channels(ch)
    enc.set_quality(2)
    with open(j["arquivo"], "wb") as f:
        f.write(enc.encode(pcm) + enc.flush())
    print("gravado ", j["arquivo"])
