# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ferdiokt/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ferdiokt/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme for make.fun: you call in sick for launch day, your AI agent passes the mission and wins a bounty. The picture is `meme/meme.png`, drawn by `meme/render.mjs` (make.fun ghost + every word in code, over a text-free AI-painted Vice City scene, prompt in `meme/scene.prompt.txt`). The post text is `CAPTION.txt`. `main.ts` copies `POST.json`, the X post's address, to `/output`.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
# redraw the meme (needs puppeteer-core and Chrome):
PUPPETEER=<dir with node_modules/puppeteer-core> CHROME_PATH=<chrome> node meme/render.mjs
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
