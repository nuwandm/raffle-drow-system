# Sound File Setup

## Adding Celebration Sound

To enable the celebration sound effect when a winner is revealed, add an audio file to this directory:

### File Location:
```
public/celebration.mp3
```

### Recommended Sound:
- **Format**: MP3, WAV, or OGG
- **Duration**: 2-5 seconds
- **Type**: Celebration, fanfare, or applause sound
- **Volume**: The app will play it at 50% volume

### Free Sound Resources:
1. **Pixabay**: https://pixabay.com/sound-effects/search/celebration/
2. **Freesound**: https://freesound.org/search/?q=fanfare
3. **Zapsplat**: https://www.zapsplat.com/sound-effect-category/party/

### How to Add:
1. Download a celebration sound file
2. Rename it to `celebration.mp3`
3. Place it in the `public/` folder
4. Restart the dev server (`npm run dev`)

### Alternative Formats:
If you prefer a different format, update the file name in:
`components/WinnerCard.tsx` line 20:
```typescript
const audio = new Audio('/celebration.mp3'); // Change extension here
```

### Testing:
- The sound will play automatically when a winner is revealed
- If the sound doesn't play, check browser console for errors
- Some browsers block autoplay - this is normal
- The app will continue to work even if no sound file is present
