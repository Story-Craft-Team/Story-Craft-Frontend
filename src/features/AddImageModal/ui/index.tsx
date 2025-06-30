"use client";
import React, { useEffect } from "react";
import s from "./AddImageModal.module.scss";
import NewModal from "@/shared/ui/newModal";
import { useStoryEditorStore } from "@/shared/stores";
import { uploadImage as uploadImageMutation } from "@/shared/api/images/mutations";
import { toast } from "react-toastify";

interface Props {
	addImageTo: "story" | "scene";
}

const AddImageModal = ({ addImageTo }: Props) => {
	const {
		addStoryImageModalIsVisible,
		setAddStoryImageModalIsVisible,
		addSceneImageModalIsVisible,
		setAddSceneImageModalIsVisible,
	} = useStoryEditorStore();

	const [file, setFile] = React.useState<File | null | undefined>(null);
	const [isUploading, setIsUploading] = React.useState(false);

	const setIsVisible =
		addImageTo === "story"
			? setAddStoryImageModalIsVisible
			: setAddSceneImageModalIsVisible;
	const isVisible =
		addImageTo === "story"
			? addStoryImageModalIsVisible
			: addSceneImageModalIsVisible;

	useEffect(() => {
		if (file) {
			const uploadFile = async () => {
				setIsUploading(true);
				try {
					const response = await uploadImageMutation(file);

					if (response) {
						toast.success("Изображение успешно загружено");

						// Add image to either story or scene based on prop
						// if (addImageTo === "story") {
						//   addImageToStory(response.url);
						// } else {
						//   addImageToScene(response.url);
						// }

						setIsVisible(false);
					}
				} catch (error) {
					toast.error("Ошибка при загрузке изображения");
					console.error("Upload error:", error);
				} finally {
					setIsUploading(false);
					setFile(null);
				}
			};

			uploadFile();
		}
	}, [file, setIsVisible, addImageTo /*addImageToStory, addImageToScene*/]);

	return (
		<NewModal isVisible={isVisible} setIsVisible={setIsVisible}>
			<div className={s.modalContent}>
				<label className={s.customFileUpload}>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files?.[0])}
						disabled={isUploading}
					/>
					{isUploading ? "Загрузка..." : "📁 Загрузить изображение"}
				</label>

				{file && (
					<div className={s.fileInfo}>
						<p>Выбран файл: {file.name}</p>
						<p>Размер: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
					</div>
				)}
			</div>
		</NewModal>
	);
};

export default AddImageModal;
