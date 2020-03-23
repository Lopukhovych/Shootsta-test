import React from 'react';

import './VideoForm.styles.css';
import {Button, Form} from "react-bootstrap";

const VideoFormContainer = ({
  submitUploadForm,
	changeFormInputHandler,
  changeFileHandler,
  file,
  videoForm,
	disabled,
}) => {
	return (
		<Form onSubmit={submitUploadForm}>
			<Form.Group>
				<Form.Label>Video title</Form.Label>
				<Form.Control
					name="title"
					onChange={changeFormInputHandler}
					type="text"
					placeholder="Enter video title"
					value={videoForm.title}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Video description</Form.Label>
				<Form.Control
					name="description"
					onChange={changeFormInputHandler}
					placeholder="Enter video description"
					as="textarea"
					rows="3"
					value={videoForm.description}
				/>
			</Form.Group>
			<Form.Group>
				<div className="input-group col-12 col-sm-8 pl-0 uploadVideoBlock">
					<div className="input-group-prepend">
				    <span className="input-group-text" id="inputGroupFileAddon01">
				      Upload video
				    </span>
					</div>
					<div className="custom-file uploadVideoFileName">
						<input
							type="file"
							className="custom-file-input "
							id="inputGroupFile01"
							aria-describedby="inputGroupFileAddon01"
							accept="video/*"
							onChange={changeFileHandler}
						/>
						<label className="custom-file-label " htmlFor="inputGroupFile01">
							{file ? file.name : 'Choose file'}
						</label>
					</div>
				</div>
			</Form.Group>
			<hr/>
			<Form.Group controlId="formBasicEmail">
				<Button disabled={disabled} variant="primary" type="submit">
					Submit
				</Button>
				{disabled && <Form.Text className="text-muted">
					Video title and file are required
				</Form.Text>}
			</Form.Group>
		</Form>
	);
};

export default VideoFormContainer;