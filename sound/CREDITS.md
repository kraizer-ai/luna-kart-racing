# Sound credits — 루나 카트 레이싱

The game's sound effects (behind `?sfx=a|b|c` until approved) are made from real recordings plus a few clips generated
with Stable Audio Open. Every file below was checked on its source page. The sprite files in this folder
(`engine_a.*`, `engine_b.*`, `sfx_drive.*`) are cut, pitched, looped and mixed from these sources by
`tools/sound/` (see `docs/handoff/SOUND.md`). Nothing here is from a game, a TV broadcast or the user's reference videos.

## Licences in use
- **CC0 1.0** (public domain dedication): no conditions. Credited anyway, as the authors ask.
- **CC BY 3.0 / 4.0**: free use with credit — the credit lines are below (also shown in the game's credits when there is a
  credits screen).
- **Pixabay Content License** (pixabay.com/service/terms, section 5): free commercial use and modification, no credit
  required; not allowed: selling or distributing the content on its own without creative change ("Standalone"), using
  content showing trademarks for goods/services, misleading or illegal use. Inside a game, mixed and edited, is allowed.
  Pixabay's `freesound_community` items are copies of Freesound CC0 sounds: we took the Freesound original (same sound, CC0)
  and list both pages.
- **Stability AI Community License** (Stable Audio Open 1.0, 2024-07-05; Stable Audio 3.0 uses the same licence plus the
  Gemma Terms of Use for its text encoder): we own the generated outputs; free use for individuals and organisations
  under USD 1M annual revenue — if the game ever earns money, register at https://stability.ai/community-license;
  distributing the model itself would need the licence copy and a "Powered by Stability AI" notice (we distribute only
  generated audio, credited here: **Powered by Stability AI**).

## Engine set A — F1 V8 (`engine_a.*`)
| Use | Source | Author | Licence |
|---|---|---|---|
| on/off-throttle stretches, fly-bys | [F1practice3MelbGP2012DR066.wav](https://freesound.org/people/Ears68/sounds/150337/) | Ears68 | CC0 1.0 |
| idle, launch | [F-1raceCar-IdleAndRaceStartDemo.wav](https://freesound.org/people/Ears68/sounds/181187/) | Ears68 | CC0 1.0 |
| V10 fly-bys (set C) | [backstraight.aif](https://freesound.org/people/Heigh-hoo/sounds/14833/) | Heigh-hoo | CC0 1.0 |
| lift-off crackles, upshift cracks, one fly-by | generated: "race car exhaust crackles and pops on deceleration", "Formula 1 car fly-by" | Stable Audio Open 1.0 | Stability AI Community License (Powered by Stability AI) |

Set C uses the same files as A, pitched up 30 %.

## Engine set B — Ferrari V8 (`engine_b.*`) — everyone's sound since 2026-11-17
| Use | Source | Author | Licence |
|---|---|---|---|
| on/off-throttle stretches, a blip | [ferrari355underhood4.mp3](https://freesound.org/people/enginemusic/sounds/43484/) | enginemusic | **CC BY 3.0** — "ferrari355underhood4.mp3" by enginemusic (https://freesound.org/s/43484/), licensed under CC BY 3.0 |
| idle, revs | [Ferrari 360 Spider - engine sound](https://freesound.org/people/PritzProductions/sounds/241083/) | PritzProductions | CC0 1.0 |
| fly-bys (V8 race car passing, Doppler) | generated: "a Ferrari V8 race car passes by very fast at a race track …" (seeds 501, 503) | Stable Audio 3.0 small-sfx / medium | Stability AI Community License (Powered by Stability AI); its text encoder T5Gemma under the Gemma Terms of Use |
| crackles | as set A (Stable Audio Open) | | |

## Driving, contact and race sounds (`sfx_drive.*`)
| Sound | Source | Author | Licence |
|---|---|---|---|
| asphalt roll | [inside car 90 km asphalt 190710_0056.wav](https://freesound.org/people/klankbeeld/sounds/612011/) | klankbeeld | **CC BY 4.0** — "inside car 90 km asphalt 190710_0056.wav" by klankbeeld (https://freesound.org/s/612011/), licensed under CC BY 4.0 |
| wooden deck roll | generated: "a cart driving over wooden bridge planks at speed, deep hollow wood resonance and regular clack clack of the boards …" (seed 212) | Stable Audio 3.0 small-sfx | Stability AI Community License (Powered by Stability AI) |
| deck joist thumps | [Skateboard rolling down wooden bridge.wav](https://freesound.org/people/Bruno_Garcez/sounds/243762/) (Pixabay copy: [link](https://pixabay.com/sound-effects/city-skateboard-rolling-down-wooden-bridge-74284/)) | Bruno_Garcez | CC0 1.0 |
| glass road roll | [Skateboard rolling down concrete ramp.wav](https://freesound.org/people/Bruno_Garcez/sounds/243765/) | Bruno_Garcez | CC0 1.0 |
| off-track gravel/dirt roll | [car tire on gravel rear cu blyth 21 6 12.flac](https://freesound.org/people/TRP/sounds/577504/) (Pixabay copy: [link](https://pixabay.com/sound-effects/city-car-tire-on-gravel-rear-cu-blyth-21-6-12-25895/)) | TRP | CC0 1.0 |
| off-track grass | [Bike_On_Grass_OS.wav](https://freesound.org/people/KevinDuffy1234/sounds/340197/) | KevinDuffy1234 | CC0 1.0 |
| wheel spin / slide on sand and gravel (the user's pick) | Pixabay "Wheel Spin on Gravel" ([page](https://pixabay.com/sound-effects/city-wheel-spin-on-gravel-106641/), freesound_community) = [Wheel Spin on Gravel.wav](https://freesound.org/people/alexftw123/sounds/152657/) | alexftw123 | CC0 1.0 |
| kerb rumble | [rumble strip exit 41.wav](https://freesound.org/people/bsumusictech/sounds/62652/) (Pixabay copy: [link](https://pixabay.com/sound-effects/city-rumble-strip-exit-41-78988/)) | bsumusictech | CC0 1.0 |
| light slide squeal | generated: "light tyre scrub and gentle squeal of a racing car sliding slightly in a corner" | Stable Audio Open 1.0 | Stability AI Community License |
| drift screech | [Chrysler LHS tire squeal 04 (04-25-2009).wav](https://freesound.org/people/audible-edge/sounds/71739/) | audible-edge | CC0 1.0 |
| lock-up skid | [Tires Squeaking.aif](https://freesound.org/people/RutgerMuller/sounds/104026/) | RutgerMuller | CC0 1.0 |
| wind | [air over mic.wav](https://freesound.org/people/cognito%20perceptu/sounds/20108/) | cognito perceptu | CC0 1.0 |
| wall scrape loop, grind chunks | generated: "metal and plastic scraping along a concrete wall at speed" | Stable Audio Open 1.0 | Stability AI Community License |
| light hits | [MTLimpt_Metal Impact Medium Bang Resonate x17](https://freesound.org/people/harrisonlace/sounds/798843/) | harrisonlace | CC0 1.0 |
| hard hit | [Car Crash_EXT.wav](https://freesound.org/people/PauliusI/sounds/346299/) (Pixabay copy: [link](https://pixabay.com/sound-effects/city-car-crash-ext-6388/)) | PauliusI | CC0 1.0 |
| kart bump | [PlasticImpactA9.wav](https://freesound.org/people/jomse/sounds/525099/) | jomse | CC0 1.0 |
| hard bump | [S022_Plastic_Impact_Mono.wav](https://freesound.org/people/P%C3%B3l/sounds/385940/) | Pól | CC0 1.0 |
| hard bump (second take) | generated: "plastic bumper of a go-kart hits another kart from behind, loud plastic thud with a crack" (seed 312) | Stable Audio 3.0 medium | Stability AI Community License |
| bits and debris | [flashlight … fall on gritty concrete … impact.wav](https://freesound.org/people/kyles/sounds/452622/) | kyles | CC0 1.0 |
| landing | [S019_Landing_Impact_Mono.wav](https://freesound.org/people/P%C3%B3l/sounds/385933/) | Pól | CC0 1.0 |
| booster flame | [Fire Torch_Whoosh 2(medium speed).wav](https://freesound.org/people/kev_durr/sounds/426209/) | kev_durr | **CC BY 4.0** — "Fire Torch_Whoosh 2(medium speed).wav" by kev_durr (https://freesound.org/s/426209/), licensed under CC BY 4.0 |
| short whoosh (pass-by air, post-drift boost) | [Woosh (stick swung in the air)](https://freesound.org/people/Dalesome/sounds/352719/) | Dalesome | CC0 1.0 |
| reset whoosh | [Little Whoosh 2](https://freesound.org/people/ch_ase/sounds/423799/) | ch_ase | CC0 1.0 |
| start beeps | [Swimming match beep](https://freesound.org/people/hz37/sounds/396450/) | hz37 | CC0 1.0 |
| final-lap bell | [Small Bell Ringing.wav](https://freesound.org/people/se2001/sounds/503134/) | se2001 | CC0 1.0 |
| finish horn | [S026_Airhorn_Bright_Sound_Mono.wav](https://freesound.org/people/P%C3%B3l/sounds/385922/) | Pól | CC0 1.0 |
| finish crowd | [applause cheer ext medium crowd …](https://freesound.org/people/kyles/sounds/455659/) | kyles | CC0 1.0 |
| booster ready click, glass seam tick | [Metallic_Click](https://freesound.org/people/BlondPanda/sounds/778444/) | BlondPanda | CC0 1.0 |
| booster full beep | [stopwatch beep.wav](https://freesound.org/people/vestibule-door/sounds/668985/) | vestibule-door | CC0 1.0 |
| coins | [Coins Being Dropped-Assorted](https://freesound.org/people/TheWoodlandNomad/sounds/363090/) | TheWoodlandNomad | CC0 1.0 |
| splash | [Cannonball off dock, splashing, swimming.wav](https://freesound.org/people/SpliceSound/sounds/260131/) | SpliceSound | CC0 1.0 |

Generated clips (Stable Audio Open 1.0, local, seeds and prompts recorded in the worker's generation log): crackles
(seeds 41, 42), F1 fly-by (seed 32), tyre scrub (seed 121), wall scrape (seeds 141, 142).

## Park ambience (`sfx_world.*`)
| Bed | Source | Author | Licence |
|---|---|---|---|
| fountain jets (fountain circuit) | [Urban Fountain (San Francisco)](https://freesound.org/s/237430/) | mhtaylor67 | CC0 1.0 |
| lake | [Waves gentle med cu lake water](https://freesound.org/s/573191/) | TRP | CC0 1.0 |
| birds by day | [Bird Park Ambience](https://freesound.org/s/234315/) | nick121087 | CC0 1.0 |
| far city | [City hum #1](https://freesound.org/s/179117/) | morosopher | CC0 1.0 |
| night crickets | [Ambiance_Nature_Night_Cricket_Calm_Loop_Stereo.wav](https://freesound.org/s/637083/) | Nox_Sound | CC0 1.0 |
| leaves in a breeze | [Wind in a tree, close to the foliage](https://freesound.org/s/167434/) | felix.blume | CC0 1.0 |

## Menus, garage, shop and rooms (`sfx_ui.*`)
| Sound | Source (author) | Licence |
|---|---|---|
| button clicks | [buttons click pastic.wav](https://freesound.org/s/545527/) (rsellick) | CC0 1.0 |
| swish (close, back) | [Swishes and swooshes](https://freesound.org/s/447808/) (florianreichelt) | CC0 1.0 |
| toggles | [Flipping Light Switch 5](https://freesound.org/s/840876/) (justamudkip) | CC0 1.0 |
| paint spray | [paint_shake_and_spray.wav](https://freesound.org/s/707374/) (Mohagged) | CC0 1.0 |
| decal peel | [sticker peel.flac](https://freesound.org/s/27976/) (tim.kahn) | **CC BY 4.0** — "sticker peel.flac" by tim.kahn (https://freesound.org/s/27976/), licensed under CC BY 4.0 |
| pencil (pixel drawing) | [Pen or marker writing on paper - close up](https://freesound.org/s/565206/) (khenshom) | CC0 1.0 |
| eraser (delete) | [erasing .wav](https://freesound.org/s/486378/) (an_na_ba_na_na) | CC0 1.0 |
| swatch tap | [Credit card tap.wav](https://freesound.org/s/588325/) (honeybunny_) | CC0 1.0 |
| ratchet, air impact wrench (fitting) | [Ratchet Wrench Slow Multiple](https://freesound.org/s/591528/) (Rudmer_Rotteveel), [Air Impact Wrench](https://freesound.org/s/349398/) (sevenbsb) | CC0 1.0 |
| latch (fitted) | [LATCH (Metallic)](https://freesound.org/s/480869/) (C3Sabertooth) | CC0 1.0 |
| coins, purchase | [Coins](https://freesound.org/s/174629/) (altfuture), [old cash register open and close with a bing](https://freesound.org/s/584168/) (clubmydia+) | CC0 1.0 |
| ready, all ready | [GoStoneSounds.ogg](https://freesound.org/s/588317/) (billhails2), [several shots of doorbell.wav](https://freesound.org/s/640767/) (fabiopx) | CC0 1.0 |
| join, leave | [Shop door bell.wav](https://freesound.org/s/494565/) (775noise), [Wooden door 1 …](https://freesound.org/s/342873/) (Pfannkuchn) | CC0 1.0 |

Stable Audio 3.0 generations: local, 8 steps, prompts and seeds in the worker's generation log.
