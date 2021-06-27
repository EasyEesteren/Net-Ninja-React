const { useEffect, useState } = require("react")

// Custom hook for getting blog data, custom hooks must begin with 'use' or they won't work
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {
        fetch(url)
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
                setError(err.message);
                setPending(false);
            })
    }, [url]); // empty dependency array means only fire this function on the initial load not when data changes

    return {data, isPending, error}
}

export default useFetch;