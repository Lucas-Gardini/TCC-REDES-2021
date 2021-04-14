function animateButton() {
	const e = document.getElementById("buy-it");
	//reset animation
	e.classList.remove("animate");

	e.classList.add("animate");
	setTimeout(function () {
		e.classList.remove("animate");
	}, 700);
}
