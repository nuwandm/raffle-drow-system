# Audio Files for Horror Raffle Draw

This folder contains the audio files for the raffle draw system.

## Required MP3 Files

Please add the following MP3 files generated from Suno AI to this folder:

### 1. `drawing-background.mp3`
- **Purpose**: Background music that plays during the raffle drawing (while names are shuffling)
- **Duration**: 5-10 seconds (will loop)
- **Theme**: Suspenseful, horror-themed music
- **Mood**: Tense, dramatic build-up
- **Suggestions**:
  - Eerie strings
  - Low rumbling bass
  - Subtle horror ambience
  - Building tension

### 2. `thunder.mp3`
- **Purpose**: Thunder/lightning sound effect played at the start of drawing or dramatic moments
- **Duration**: 2-4 seconds
- **Theme**: Dramatic thunder crash
- **Mood**: Shocking, attention-grabbing
- **Suggestions**:
  - Thunder crack
  - Lightning strike
  - Dramatic impact sound

### 3. `winner-celebration.mp3`
- **Purpose**: Victory celebration when winner is revealed
- **Duration**: 3-5 seconds
- **Theme**: Horror-themed celebration
- **Mood**: Triumphant but spooky
- **Suggestions**:
  - Demonic laugh mixed with celebration
  - Spooky victory fanfare
  - Horror movie victory theme
  - Friday the 13th/Jason theme style celebration

## Audio Specifications

- **Format**: MP3
- **Bit Rate**: 128-192 kbps recommended
- **Sample Rate**: 44.1 kHz
- **Channels**: Stereo or Mono

## Suno AI Prompts (Examples)

You can use these prompts in Suno AI:

**Drawing Background Music:**
```
Suspenseful horror background music, tense strings, dramatic build-up,
Friday the 13th inspired, dark atmospheric, 5 seconds loop
```

**Thunder Sound:**
```
Thunder crash sound effect, dramatic lightning strike, horror movie thunder,
intense impact, 3 seconds
```

**Winner Celebration:**
```
Horror victory celebration, spooky triumph fanfare, demonic celebration laugh,
Friday the 13th theme celebration, 4 seconds
```

## Testing

After adding the files, the audio will automatically play at these moments:
- **Drawing Background**: Starts when you click "Draw Winner" button
- **Thunder**: Can be triggered at the start of the draw
- **Winner Celebration**: Plays when the winner is revealed

## Volume Levels

Default volumes are set as:
- Drawing Background: 60%
- Thunder: 40%
- Winner Celebration: 70%

You can adjust these in `lib/audioSystem.ts` if needed.
