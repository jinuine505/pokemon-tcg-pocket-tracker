import { useLocation } from "react-router";
import CardCard from "../components/CardCard";
import useCardSearch from "../hooks/useCardSearch";
import useSets from "../hooks/useSet";
import { formatId } from "../utility/helperFuncs";
import "../css/Search.css"


const Search = () => {
    // Extract query
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");

    // Filter cards by query
    const { filteredCards, isPending, isError } = useCardSearch(searchQuery);

    // Load all sets
    const { data: sets } = useSets();

    // Check loading state or errors
    if (isPending) return <div className="loading">Loading...</div>
    if (isError) return <div className="error">Error loading data</div>;

    return (
        <div className="search-results">
            <div className="search-results-header">Results for: "{searchQuery}"</div>
            {(filteredCards.length === 0) ? (<div className="no-result">No matches found</div>) : (<div className="card-grid">
                {filteredCards.map((card) => {
                    // Match formats of two different card set ids (ex. A-1 === a1)
                    const cardSet = card.id.split("-")[0];
                    const match = sets.find((set) => formatId(set.id) === cardSet);

                    return <CardCard card={card} setId={match.id} key={card.id} />
                })}
            </div>)}
        </div>

    );
}

export default Search;