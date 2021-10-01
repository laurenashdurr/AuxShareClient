let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1 ':
        APIURL = 'http://localhost:3000';
        break;

    case 'aux-share-client.herokuapp.com':
        APIURL = 'https://lad-aux-share.herokuapp.com'

}

export default APIURL;