import './FavoriteButton.css'

type FavoriteButtonProps = {
  isFavorite: boolean
  onToggle: () => void
}

function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className="favorite-button"
      onClick={onToggle}
      aria-pressed={isFavorite}
    >
      {isFavorite ? '★ Remove from favorites' : '☆ Add to favorites'}
    </button>
  )
}

export default FavoriteButton
