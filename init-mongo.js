// eslint-disable-next-line no-undef
db = db.getSiblingDB('mhd')
db.createUser({
  user: 'mhd',
  pwd: 'thisIsPassword',
  roles: [{ role: 'readWrite', db: 'mhd' }]
});