const socket = io();

const uploadFile = () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch("api/v1/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to upload file");
                }
                return res.json();
            })
            .then((data) => alert(data.message))
            .catch((err) => alert(err.message));
    } else {
        alert("Please select a file");
    }
};

const downloadFile = (filename) => {
    fetch(`api/v1/download/${filename}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to download file");
            }
            return res.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch((err) => alert(err.message));
};

const updateFileList = (files) => {
    const fileListElement = document.getElementById("fileList");
    fileListElement.innerHTML = "";

    files.forEach((file) => {
        const divElem = document.createElement("div");

        const spanElem = document.createElement("span");
        spanElem.textContent = file.filename;

        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-btn");
        downloadButton.textContent = "Download";
        downloadButton.onclick = () => {
            downloadFile(file.filename);
        };

        divElem.appendChild(spanElem);
        divElem.appendChild(downloadButton);

        fileListElement.appendChild(divElem);
    });
};

socket.on("updateFileList", (files) => {
    updateFileList(files);
    console.log(files);
});
