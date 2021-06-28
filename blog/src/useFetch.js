import { useState, useEffect } from "react";

// Custom hook for getting blog data, custom hooks must begin with 'use' or they won't work
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        const abortCont = new AbortController();
        
        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setPending(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                }
                else {
                    setError(err.message);
                    setPending(false);
                }
            })
        return () => abortCont.abort();
    }, [url]); // empty dependency array means only fire this function on the initial load not when data changes

    return {data, isPending, error}
}

export default useFetch;