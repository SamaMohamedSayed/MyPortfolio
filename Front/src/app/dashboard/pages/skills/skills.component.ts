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

  loadSkills() {
    this.global.getSkills().subscribe((res: any) => {
      this.skillsList = res;
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

}
