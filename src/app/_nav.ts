export const navigation_blankdata  = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  }

];

export const navigation_grpID_Wipro_CIM = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  {
        name: 'ReProvision',
        url: '/nsa/reprovision',
        icon: 'icon-cursor'
      }
];



export const navigation_grpID_RAFM = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  
{
    name: 'Series Provision',
    url: '/nsa/seriesprovision',
    icon: 'icon-cursor'
  },
  {
        name: 'DeProvision',
        url: '/nsa/deprovision',
        icon: 'icon-cursor'
      },
      {
            name: 'Discrete Provision',
            url: '/nsa/discprovision',
            icon: 'icon-cursor'
          }
	  ,
  {
        name: 'ReProvision',
        url: '/nsa/reprovision',
        icon: 'icon-cursor'
      },
  {
        name: 'MNP ReProvision',
        url: '/nsa/mnpreprovision',
        icon: 'icon-cursor'
      }
];

export const navigation_grpID_Wipro_Billing = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  {
    name: 'Series Provision',
    url: '/nsa/seriesprovision',
    icon: 'icon-cursor'
  },
  {
        name: 'DeProvision',
        url: '/nsa/deprovision',
        icon: 'icon-cursor'
      },
      {
            name: 'Discrete Provision',
            url: '/nsa/discprovision',
            icon: 'icon-cursor'
          },
  {
        name: 'ReProvision',
        url: '/nsa/reprovision',
        icon: 'icon-cursor'
      },
	  {
        name: 'MNP ReProvision',
        url: '/nsa/mnpreprovision',
        icon: 'icon-cursor'
      }
];


export const navigation_grpID_BSS_Planning = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  
  {
    name: 'Series Definition',
    url: '/nsa/seriesdefinition',
    icon: 'icon-cursor'
  }
];

export const navigation_grpID_VDSO = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  
  {
    name: 'Series Definition',
    url: '/nsa/seriesdefinition',
    icon: 'icon-cursor'
  }
  ,
  
  {
    name: 'APN Creation',
    url: '/nsa/apn',
    icon: 'icon-cursor'
  }
];

export const navigation_grpID_CNP = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },
  
  {
    name: 'Series Definition',
    url: '/nsa/seriesdefinition',
    icon: 'icon-cursor'
  },
{
    name: 'Series Provision',
    url: '/nsa/seriesprovision',
    icon: 'icon-cursor'
  },
  {
    name: 'DeProvision',    
	 url: '/deprovision',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/deprovision',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/deprovisionform',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'APN',    
	 url: '/apn',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/apn',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/apnform',
        icon: 'icon-puzzle'
      }
    ]
  }, 

  {
    name: 'SDP Migration',    
	 url: '/nsa/sdpmigration',
    icon: 'icon-cursor',
    
  }, 
     {
		 title: true,
	 name: 'Report Module'},{
		 name: 'Report',
    url: '/nsa/nsareport',
    icon: 'icon-speedometer'
      }

];

export const navigation_grpID_Sourcing = [
   
  {
    name: 'Landing Page',
    url: '/nsa',
	icon: 'icon-star'
  }, 
{
    title: true,
    name: 'Work Requests'
  },   
  {
    name: 'Series Definition',
    url: '/seriesdefinition',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/seriesdefinition',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/seriesdefintionform',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Series Provision',
    url: '/seriesprovision',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/seriesprovision',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/seriesprovisionform',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'DiscProvision',    
	 url: '/discprovision',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/discprovision',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/discprovisionform',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'ReProvision',    
	 url: '/reprovision',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/reprovision',
        icon: 'icon-puzzle'
      },
      {
        name: 'ReProvision Eligibility',
        url: '/nsa/reprovisionsearch',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/reprovisionform',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'MNP ReProvision',    
	 url: '/mnpreprovision',
    icon: 'icon-cursor',
    children: [	
      {
        name: 'Ongoing List',
        url: '/nsa/mnpreprovision',
        icon: 'icon-puzzle'
      },
      {
        name: 'MNP ReProvision Eligibility',
        url: '/nsa/mnpreprovisionsearch',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Creation',
        url: '/nsa/mnpreprovisionform',
        icon: 'icon-puzzle'
      }
    ]
  },
	  {
		 title: true,
	 name: 'Report Module'},{
		 name: 'Report',
    url: '/nsa/nsareport',
    icon: 'icon-speedometer'
      }

];

export const navigation_primedata = [  
  {
    name: 'PrimeData Dashboard',
    url: '/primedata',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Gauge',
    url: '/primedata/Gaugetest',
    icon: 'icon-drop'
  },
  
  
  {
    name: 'Work In Progoress',
    url: '/primedata/WorkInProgoress',
    icon: 'icon-drop'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Social Buttons',
        url: '/buttons/social-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/pages/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/pages/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/pages/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/pages/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }
];

export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Social Buttons',
        url: '/buttons/social-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/pages/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/pages/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/pages/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/pages/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }
];
