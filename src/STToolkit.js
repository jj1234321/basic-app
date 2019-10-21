export class STToolkit
{
    constructor(server)
    {
        this.server = server;
        if(!this.server.endsWith('/'))
        {
            this.server += '/';
        }
    }

    STT(encoding, sampleRate, locale, wav)
    {
        var formData = new FormData();

        formData.append('encoding', encoding);
        formData.append('sampleRate', sampleRate);
        formData.append('locale', locale);
        formData.append('audio', wav);

        return new Promise((resolve, reject) => {
            fetch(this.server + 'sttoolkit/translation/stt', {
                method: 'POST',
                body: formData
            })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {resolve(json);})
            .catch((ex) => {reject(ex);});
        });
    }

    TTS(encoding, voice, locale, text)
    {
        var formData = new FormData();

        formData.append('encoding', encoding);
        formData.append('voice', voice);
        formData.append('locale', locale);
        formData.append('text', JSON.stringify(text));

        return new Promise((resolve, reject) => {
            fetch(this.server + 'sttoolkit/translation/tts', {
                method: 'POST',
                body: formData
            })
            .then((resp) => {
                return resp.blob();
            })
            .then((blob) => {resolve(blob);})
            .catch((ex) => {reject(ex);});
        });
    }
}
