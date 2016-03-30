{
    "name": "template_mode_ete",
    "description": "Template du mode de régulation Ete",
    "objects":[{
        "name":"Ete",
        "type":"sys::Folder",
        "childrens":[
            {
                "name":"ConsEte",
                "type":"types::ConstFloat"
            },
            {
                "name":"Kp",
                "type":"types::ConstFloat"
            },
            {
                "name":"Ki",
                "type":"types::ConstFloat"
            },
            {
                "name":"TRep",
                "type":"types::WriteFloat"
            },
            {
                "name":"LP",
                "type":"func::LP"
            },
            {
                "name":"VFr",
                "type":"types::WriteFloat"
            }
        ],
        "links":[
            {
                "from":"ConsEte.out",
                "to":"LP.sp"
            },
            {
                "from":"Kp.out",
                "to":"LP.kp"
            },
            {
                "from":"Ki.out",
                "to":"LP.ki"
            },
            {
                "from":"TRep.out",
                "to":"LP.cv"
            },
            {
                "from":"ConsEte.out",
                "to": "LP.cv"
            }
        ]
    }]
}