const FavouriteCities = ({favoriteCities}) => {
    return (
        <>
         {favoriteCities.length !== 0 ? (
            <ul>
              {favoriteCities.map((city) => (
                <li key={city.name}>{city.name}</li>
              ))}
            </ul>
          ) : (
            <p>There are no cities to show</p>
          )}
        </>
    )
}
export default FavouriteCities;