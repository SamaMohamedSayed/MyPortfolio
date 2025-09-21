import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillsList: any[] = [];
  isEditModalOpen = false;
  skillForm!: FormGroup;
  selectedId: string = '';

  constructor(private global: GlobalService) {}

  ngOnInit() {
    this.loadSkills();
  }

    groupByCategory(data: any[]) {
    const grouped: any = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = {
          category: item.category,
          skills: []
        };
      }
      grouped[item.category].skills.push(...item.skills);
    });

    return Object.values(grouped);
  }

  loadSkills() {
    this.global.getSkills().subscribe((res: any) => {
      this.skillsList = this.groupByCategory(res);
      console.log(res);
      
    });
  }

  get skillArray(): FormArray {
    return this.skillForm.get('skills') as FormArray;
  }

  openEditModal(category: any) {
    this.skillForm = new FormGroup({
      category: new FormControl(category.category, Validators.required),
      skills: new FormArray(
        category.skills.map((s: any) =>
          new FormGroup({
            name: new FormControl(s.name, Validators.required),
            image: new FormControl(s.image)
          })
        )
      )
    });

    this.selectedId = category._id;
    this.isEditModalOpen = true;
    console.log("Modal opened:", this.isEditModalOpen);
  }

  onUpdate() {
    if (this.skillForm.invalid) return;
    this.global.updateSkills(this.skillForm.value,this.selectedId).subscribe({
      next: (res: any) => {
        console.log(res.message);
        this.isEditModalOpen = false;
        this.loadSkills();
      },
      error: () => {
        console.log("err");
        
      }
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  softDeleteCategory(id: string) {
    this.global.deleteSkill(id).subscribe({
      next: () => {
        this.skillsList = this.skillsList.filter(c => c._id !== id);
      }
    });
  }

  openAddModal() {
  this.skillForm = new FormGroup({
    category: new FormControl('', Validators.required),
    skills: new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        image: new FormControl(null)
      })
    ])
  });

  this.selectedId = '';
  this.isEditModalOpen = true;
}

addSkillField() {
  this.skillArray.push(
    new FormGroup({
      name: new FormControl('', Validators.required),
      image: new FormControl('')
    })
  );
}


onFileSelected(event: any, index: number) {
  const file = event.target.files[0];
  if (file) {
    this.skillArray.at(index).get('image')?.setValue(file);
  }
}
onSubmit() {
  if (this.skillForm.invalid) return;

  const formData = new FormData();
  formData.append('category', this.skillForm.get('category')?.value);

this.skillArray.controls.forEach((control, index) => {
  const skillObj = {
    name: control.get('name')?.value,
    image: control.get('image')?.value
  };

  formData.append('skills', JSON.stringify(skillObj));

  // لو صورة جديدة
  const imageVal = control.get('image')?.value;
  if (imageVal instanceof File) {
    formData.append('image', imageVal);
  }
});


  if (this.selectedId) {
    // Update
    this.global.updateSkills(formData, this.selectedId).subscribe({
      next: () => {
        this.isEditModalOpen = false;
        this.loadSkills();
      }
    });
  } else {
    // Add
    this.global.addSkill(formData).subscribe({
      next: () => {
        this.isEditModalOpen = false;
        this.loadSkills();
      }
    });
  }
}


}
