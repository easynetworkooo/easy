
const randomColors = [
    'to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%',
    '120deg, #f6d365 0%, #fda085 100%',
    '120deg, #a1c4fd 0%, #c2e9fb 100%',
    '120deg, #d4fc79 0%, #96e6a1 100%',
    '120deg, #84fab0 0%, #8fd3f4 100%',
    'to right, #43e97b 0%, #38f9d7 100%',
    'to top, #30cfd0 0%, #330867 100%',
    'circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%',
    '135deg, #667eea 0%, #764ba2 100%',
    'to top, #9890e3 0%, #b1f4cf 100%',
    '180deg, #2af598 0%, #009efd 100%',
    'to right, #434343 0%, black 100%',
    'to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%',
    'to right, #f83600 0%, #f9d423 100%',
    '-20deg, #d558c8 0%, #24d292 100%',
    '-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%',
    '-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%',
    '-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%',
    'to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%',
    '-20deg, #616161 0%, #9bc5c3 100%',
    'to top, #0fd850 0%, #f9f047 100%'
]


export const createRandomColor = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)]
}

export const defaultColor = createRandomColor()
