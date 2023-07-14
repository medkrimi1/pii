import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Acceuil',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/compte/admin/dashboard'
  },
  {
    label: 'Pages',
    isTitle: true
  },
  {
    label: 'Événements',
    icon: 'list',
    subItems: [
      {
        label: 'Ajouter Événement',
        link: 'admin/ajouter/evenement',
      },
      {
        label: 'Listes des Événements',
        link: 'admin/evenements'
      },
  
    ]
  },

  {
    label: 'Dossiers sponsoring',
    icon: 'dollar-sign',
    subItems: [
      {
        label: 'Tous les Dossiers',
        link: 'admin/sponsoring',
      },
      {
        label: 'Ajouter dossier sponsoring',
        link: 'admin/ajouter/sponsoring'
      },
   
      {
        label: 'Packs',
        link: 'admin/sponsoring',
      },
    ]
  },
  


  {
    label: 'utilisateurs',
    icon: 'users',
    subItems: [
      {
        label: 'Tous les utilisateurs',
        link: 'admin/utilisateurs',
      },

   
    ]
  },


  
  
  {
    label: 'Calendrier',
    icon: 'calendar',
    link: '/compte/apps/calendar',
   
  },


  {
    label: 'Logistique',
    icon: 'list',
    link: '/compte/admin/logistique',
   
  },
  {
    label: 'Paramétres',
    isTitle: true
  },

  {
    label: 'Mon compte',
    icon: 'settings',
    link: '/compte/admin/parametres',
   
  },
  
  
 
];
