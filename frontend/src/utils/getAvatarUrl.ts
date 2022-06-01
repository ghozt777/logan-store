import config from '../config/config.json'
export const getAavatarUrl = (name: string) => {
    let url: string = config["avatar-url"];
    url = url.replace(/:seed/g, name).replace(/:sprites/g, 'micah');
    return url;
}