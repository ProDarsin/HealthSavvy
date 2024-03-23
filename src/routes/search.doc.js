


const searchHospitals={
    tags:["Search"],
    summary:' search hospital by specialization',
    description:'search hospital by specialization',

    parameters:[
        { 
            name:'specialization',
            in:'query',
            description:'search hospital boy specialization ',
            type:'string',
            
        }
    ],
    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                      
                    }
                }
            }
        }
    }
}
const searchMedicine={
    tags:["Search"],
    summary:' search  Medicine',
    description:' search  Medicine',
    parameters:[
        { 
            name:'medicine',
            in:'query',
            description:'search medicine',
            type:'string',
            
        }
    ],
    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                      
                    }
                }
            }
        }
    }
}
const searchDoctors={
    tags:["Search"],
    summary:' search Doctor',
    description:'search Doctor',

    parameters:[
        { 
            name:'doctor',
            in:'query',
            description:'search Doctor ',
            type:'string',
            
        }
    ],
    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                      
                    }
                }
            }
        }
    }
}

const searchNurses={
    tags:["Search"],
    summary:' search Nurse',
    description:'search Nurse',

    parameters:[
        { 
            name:'nurse',
            in:'query',
            description:'search nurse ',
            type:'string',
            
        }
    ],
    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                      
                    }
                }
            }
        }
    }
}
const searchPharmacys={
    tags:["Search"],
    summary:' search Pharmacy',
    description:'search Pharmacy',

    parameters:[
        { 
            name:'Pharmacy',
            in:'query',
            description:'search pharmacy ',
            type:'string',
            
        }
    ],
    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                      
                    }
                }
            }
        }
    }
}
const Search={
    '/api/search/hospital':{
        post:searchHospitals,
    },
      '/api/search/medicine':{
        post:searchMedicine,
      },
      '/api/search/doctor':{
        post:searchDoctors,
      },
      '/api/search/pharmacy':{
        post:searchPharmacys,
      },
      '/api/search/nurse':{
        post:searchNurses,
      }
  }

  export default Search