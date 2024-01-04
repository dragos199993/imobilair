'use server'

export const getAudio = async (text: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': '33d0604e86f92018f95bbe68472f575b',
    },
    body: `{"model_id":"eleven_multilingual_v2","text":"${text}","voice_settings":{"similarity_boost":0.5,"stability":0.5,"style":0.5,"use_speaker_boost":true}}`,
  }

  const response = await fetch(
    'https://api.elevenlabs.io/v1/text-to-speech/29vD33N1CtxCmqQRPOHJ',
    options
  )
  const data = await response.json()

  return data
}
