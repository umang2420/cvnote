  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup } from '@angular/forms';
  import { UserDataService } from 'src/app/services/user-data.service';
  import { ResumeService } from 'src/app/usernote/resume.service';

  @Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.css'],
  })
  export class CvComponent {
    currentCv: any;
    UserData: string = '';
    CvForm: FormGroup;
    btnEdit: string = 'edit';
    value: any;
    user: any;
    visible = true;
    userId: string = '';
    data: any;
    CvNote: any;
    noteID: any;
    items = ['Hard Working', 'Adjustable Nature', 'Opportunity Facing'];
    languages = ['English', 'hindi', 'Punjabi'];

    constructor(private service: UserDataService,private CVService: ResumeService) {
      this.value = JSON.parse(sessionStorage.getItem('loginData') || '{}');
      this.userId = this.value.id;
      this.CVService.getCvNote().subscribe((data) => {
        data.forEach((result) => {
          if (result.userId === this.value.id) {
            this.currentCv = result;
          }
          this.CvNote = data;
          this.CvNote.forEach((user: any) => {
            if (user.id == this.userId) {
              this.noteID.push(user);
            }
            console.log(user);
          });
        });
      });
      this.CvForm = new FormGroup({
        UserName: new FormControl(this.value.UserName),
        UserEmail: new FormControl(''),
        UserNumber: new FormControl(''),
        UserDate: new FormControl(''),
        UserText: new FormControl(''),
        items: new FormControl(this.items),
        languages: new FormControl(this.languages),
      });
    }

    editBtnHandler() {
      this.visible = false;
      if (this.btnEdit === 'edit') {
        alert('Edit is working');
        this.btnEdit = 'save';
      } else {
        const updatedData = {
          UserName: this.CvForm.value.UserName,
          UserEmail: this.CvForm.value.UserEmail,
          UserNumber: this.CvForm.value.UserNumber,
          UserDate: this.CvForm.value.UserDate,
          UserText: this.CvForm.value.UserText,
          items: this.CvForm.value.items,
          languages: this.CvForm.value.languages,
          userId: this.userId,
        };

        if (this.currentCv.id) {
          this.CVService.updateNotes(this.currentCv.id, updatedData).subscribe(
            (result) => {
              console.log(result);
              alert('Data updated successfully');
              this.btnEdit = 'edit';
            }
          );
        } else {
          this.CVService.userNote(updatedData).subscribe((result) => {
            console.log(result);
            alert('Data saved successfully');
            this.btnEdit = 'edit';
          });
        }
      }
    }

    editItem(i: number) {
      const newItem = prompt('Edit item:', this.items[i]);
      if (newItem !== null) {
        this.items[i] = newItem;
        const updatedData = {
          UserName: this.CvForm.value.UserName,
          UserEmail: this.CvForm.value.UserEmail,
          UserNumber: this.CvForm.value.UserNumber,
          UserDate: this.CvForm.value.UserDate,
          UserText: this.CvForm.value.UserText,
          items: this.items,
          userId: this.userId,
        };
    
        if (this.currentCv.id) {
          this.CVService.updateNotes(this.currentCv.id, updatedData).subscribe(() => {
            alert('Data updated successfully');
            this.btnEdit = 'edit';
          });
        } else {
          this.CVService.userNote(updatedData).subscribe(() => {
            alert('Data saved successfully');
            this.btnEdit = 'edit';
          });
        }
      }
    }
    
    editLanguage(i: number) {
      const newLanguage = prompt('Edit language:', this.languages[i]);
      if (newLanguage !== null) {
        this.languages[i] = newLanguage;
        const updatedData = {
          UserName: this.CvForm.value.UserName,
          UserEmail: this.CvForm.value.UserEmail,
          UserNumber: this.CvForm.value.UserNumber,
          UserDate: this.CvForm.value.UserDate,
          UserText: this.CvForm.value.UserText,
          items: this.items,
          languages: this.languages,
          userId: this.userId,
        };
        if (this.currentCv.id) {
          this.CVService.updateNotes(this.currentCv.id, updatedData).subscribe(() => {
              alert('Data updated successfully');
              this.btnEdit = 'edit';
            }
          );
        }
        else {
          this.CVService.userNote(updatedData).subscribe(() => {
            alert('Data saved successfully');
            this.btnEdit = 'edit';
          });
        }
      }
    }

    DeleteValue() {
      this.CvForm.reset();
    }

    DeleteList(i: number) {
      this.items.splice(i, 1);
    }

    DeleteLanguage(i: number) {
      this.languages.splice(i, 1);
    }

    AddList() {
      let NewList = '' + (this.items.length + 1);
      this.items.push(NewList);
    }

    AddLanguage() {
      let NewLanguage = '' + (this.languages.length + 1);
      this.languages.push(NewLanguage);
    }


discardListChanges() {
  this.items = ['Hard Working', 'Adjustable Nature', 'Opportunity Facing'];
  this.CvForm.get('items')?.setValue(this.items);
}

discardLanguageChanges() {
  this.languages = ['English', 'hindi', 'Punjabi'];
  this.CvForm.get('languages')?.setValue(this.languages);
}
  }
  
