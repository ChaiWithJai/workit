import axios from 'axios';
import querystring from 'querystring';

const SEARCH_URL = process.env.YOUTUBE_SEARCH_URL_PREFIX;

export default async function(apiKey: string, searchTerms: string) {
    const params = {
        part: 'snippet',
        type: 'video',
        key: apiKey,
        q: searchTerms
    }

    return axios(`${SEARCH_URL}?${querystring.stringify(params)}`);
}