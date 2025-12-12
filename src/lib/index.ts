function randomCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        const num = Math.floor(Math.random()*chars.length);
        code += chars[num];   
    }
    return code;
}