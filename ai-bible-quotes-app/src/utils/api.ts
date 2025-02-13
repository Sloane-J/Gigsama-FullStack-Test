export const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`http://localhost:5000/${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
