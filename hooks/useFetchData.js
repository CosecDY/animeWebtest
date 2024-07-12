const { default: axios } = require("axios");
const { useEffect, useState } = require("react");


function useFetchData(apiEndpoint){
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const [allMovie, setAllMovie] = useState([]);

    useEffect(()=>{
        if(initialLoad){
            //set initialLoad
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchAllData = async () => {
            try{
                const res = await axios.get(apiEndpoint);
                const allData = res.data;
                setAllData(allData);
                setAllMovie(allData);
                setLoading(false);
            }catch(error){
                console.error('error fetching movie data: ', error);
                setLoading(false);
            }
        }
        if(apiEndpoint){
            fetchAllData();
        }
    }, [initialLoad, apiEndpoint]);

    return {allData, loading, allMovie};
}

export default useFetchData