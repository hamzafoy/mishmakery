import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'gallery-viewer-modal',
    templateUrl: './gallery-viewer-modal.component.html',
    styleUrl: './gallery-viewer-modal.component.scss'
})
export class GalleryViewerModalComponent {
    imageSource: string = '';

    constructor(
        public dialogRef: MatDialogRef<GalleryViewerModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.imageSource = data.imgUrl;
    }
}