import md5 from 'md5';

export function sendError(res: any, message: string) {
    return res.status(400).send({
        error: { message }
    });
}

export function nameToMD5(name: string): string {
    name = name.toLowerCase();
    name = name.replace(/\s+/g, ' ').trim();
    return md5(name);
}

export function getUpdateMessage(output: any) {
    return {
        ok: !!(output?.result?.ok == 1)
    }
}