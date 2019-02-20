# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

CEO = Employee.create(first_name:'Dade', last_name:'Murphy', title:'CEO')
CTO = Employee.create(first_name:'Kate', last_name:'Libby', title:'CTO', parent: CEO)
CFO = Employee.create(first_name:'Edward', last_name:'Vedder', title:'CFO', parent: CEO)
vp_pr = Employee.create(first_name:'Margo', last_name:'Wallace', title:'VP Of Public Relations', parent: CEO)
vp_eng = Employee.create(first_name:'Eugene', last_name:'Belfort', title: 'VP Of Engineering', parent: CTO)
pr_man = Employee.create(first_name:'Richard', last_name:'Gill', title: 'Public Relations Manager', parent: vp_pr)
lead_soft = Employee.create(first_name:'Emmanuel', last_name:'Goldstein', title: 'Lead Software Engineer', parent: vp_eng)
software = Employee.create(first_name:'Paul', last_name:'Cook', title: 'Software', parent: vp_eng)
Employee.create(first_name:'Joey', last_name:'Pardella', title: 'Junior Software', parent: software)
Employee.create(first_name:'Agnes', last_name:'Pardella', title: 'Project Manager', parent: vp_pr)
Employee.create(first_name:'Ramon', last_name:'Sanches', title: 'Software Engineer', parent: software)
