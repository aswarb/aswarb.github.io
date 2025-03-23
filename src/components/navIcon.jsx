export function NavIcon({ imgPath, label }) {
    return (
        <div class="navIcon">
            <img src={imgPath} alt={label} />
            <span> </span>
        </div>
    )
}
