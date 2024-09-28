import FilterPizza from "./FilterPizza";
import Pizza from "./Pizza";

export default function Main() {
    return (
        <div 
            style={{
                display: 'grid',
                justifyContent: 'center'
            }}
        >
            <FilterPizza />
            <Pizza />
        </div>
    )
}