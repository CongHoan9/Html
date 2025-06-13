// Danh sách các ảnh
const images = [
    "image/slide1.jpg",
    "image/slide2.jpg",
    "image/slide3.jpg",
    "image/slide4.jpg"
];

let currentIndex = 0; // bắt đầu từ ảnh đầu tiên

function showImage(index) {
    const img = document.getElementById("slide");
    img.src = images[index];
}

function back() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // quay lại ảnh cuối
    }
    showImage(currentIndex);
}

function next() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; // quay lại ảnh đầu
    }
    showImage(currentIndex);
}
