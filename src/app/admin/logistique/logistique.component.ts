import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { Logistique } from 'src/app/models/logistique';
import { LogistiqueService } from 'src/app/services/logistique.service';

@Component({
  selector: 'app-logistique',
  templateUrl: './logistique.component.html',
  styleUrls: ['./logistique.component.scss']
})
export class LogistiqueComponent implements OnInit {


  logistiques: Logistique[];
  dataTable: DataTable;
  searchText: string = '';

  constructor(private LogistiqueService: LogistiqueService) { }

  ngOnInit(): void {
    this.LogistiqueService.getAllLogistiques().subscribe(logistiques => {
      this.logistiques = logistiques;
      console.log(this.logistiques);
      
      setTimeout(() => {
     
        this.dataTable = new DataTable('#LogistiquesTable');
       
      }, 100);
    });
  }


  filterLogistiques(): Logistique[] {
    if (!this.searchText) {
      return this.logistiques;
    }
    return this.logistiques.filter(logistique =>
      Object.values(logistique).join(' ').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  deleteLogistique(id: number) {
    const confirmed = confirm('Are you sure you want to delete this logistique?');
    if (confirmed) {
      this.LogistiqueService.deleteLogistiqueById(id).subscribe(() => {
        // remove the deleted event from the array of events
        this.logistiques = this.logistiques.filter(Logistique => Logistique.idLogistique !== id);
      });
    }
  }

}
