#Useful Mongo Commands

## si la base de données n'est pas dans /data/db on doit spécifier le chemin avec --dbpath
mongod --dbpath db/

## afficher toutes les base de données
show dbs

## utiliser la base "madatabase"
use madatabase

## voir dans quelle base on est
db

## afficher les collections
show collections

## renommer une collection
db.oldname.renameCollection("newname")

## effacer une collection
db.contacts.drop()

## effacer la base dans laquelle on est
db.dropDatabase()

## insertion 
db.contacts.insert({ first: 'Quentin', last: 'Busuttil' })

## sélection
db.contacts.find()
db.contacts.find({ first: 'quentin' })
db.contacts.find({ first: 'quentin', last: 'busuttil' })

##OR sélectionner selon une condition ou une autre
## il faut utiliser $or avec un array dont chaque élément est un objet littéral de sélection
db.users.find({ $or: [{ _id:ObjectId("558d0b395fa02e7e218b4587") }, { _id:ObjectId("558d0b395fa02e7e218b4574") }] })

## récupérer seulement certains champs d'un document
db.users.find({}, { _id: 0, fild1: 1, fild2: 0 })

## type == food || snacks
db.inventory.find({ type: { $in: ['food', 'snacks'] } })

# sélectionner les documents comportant un champ particulier
db.users.find({ birthyear: { $exists: true } })

# sélectionner les documents dont la valeur est différente de
db.users.find({ birthyear: { $ne: 2000 } })

# ne récupérer que le sous-document (récup le sous-document d'id x dans le doc d'id z)
db.users.find({ _id: z, "contacts._id": x }, { "contacts.$._id" : 1 })

# ordonner la sélection
# 1 = croissant/alphabétique et -1 = décroissant/alphabétique inversé
db.users.find().sort({ addedOn: 1 })


 