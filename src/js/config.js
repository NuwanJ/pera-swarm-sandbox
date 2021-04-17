// default config
const config = {
    server: 'webservices.ceykod.com',
    port: 8883,
    path: '/mqtt',
    channel: 'v1',
    token: undefined
};

// check localstorage for updated config, if not use above config
const storedConfig = localStorage.getItem(document.location.origin + '.config');

window.isAuthenticated = localStorage.getItem(
    document.location.origim + 'isAuthenticated'
);

// TODO: @NuwanJ
// const { user, pass } = getCredentials();
// window.username = user;
// window.password = pass;
window.username = 'swarm_user';
window.password = 'swarm_usere15';

let resolvedConfig =
    storedConfig !== null && storedConfig !== undefined
        ? JSON.parse(storedConfig)
        : config;

console.log(resolvedConfig);

// method to presist config data with localStorage
export const saveConfig = (data) => {
    localStorage.setItem(
        document.location.origin + '.config',
        JSON.stringify({ ...config, ...data })
    );
};

export function getCredentials() {
    const { token } = resolvedConfig;
    if (token !== undefined) {
        // decode the token
        return parseJwt(key);
    } else {
        return -1;
    }
}

// function decodeKey() {
//     try {
//         let decoded = jwt.verify(token, 'swarm-visualizer-secret');
//         return decoded;
//     } catch (err) {
//         // err
//         console.log('Token Error');
//         return -1;
//     }
// }

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export function saveCache(name, data) {
    const prevData = JSON.parse(
        localStorage.getItem(document.location.origin + `.${name}`)
    );
    if (prevData !== null && prevData !== undefined) {
        localStorage.setItem(
            document.location.origin + `.${name}`,
            JSON.stringify([...prevData, data])
        );
    } else {
        localStorage.setItem(
            document.location.origin + `.${name}`,
            JSON.stringify([data])
        );
    }
}

export default resolvedConfig;
