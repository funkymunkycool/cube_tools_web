element = $('#mol3d');
config = {
  backgroundColor: 'white'
};
viewer = $3Dmol.createViewer(element, config);
cubeLocation = '/cube/Hafnia_Stucture_calcs-SPIN_DENSITY-1_l.cube';
$.get(cubeLocation, function(data) {
  a = viewer.addModel(data, 'cube')
  viewer.setStyle({}, {stick:{radius: 0.05}});
  viewer.addStyle({}, {sphere: {radius: 0.3}})
  viewer.setProjection('orthographic')
  viewer.render()
}
)
// let xyz = '/cube/mgo.xyz'
$.get(cubeLocation, function(data) {

  createPlane(5,20)
  testdat = data
  lines = testdat.split('\n')
  nAtoms = parseInt(lines[2].trim().split(/\s+/)[0])
  xyzFile = nAtoms.toString() + '\n\n'
  maxDimensions = {'x': 0, 'y': 0, 'z': 0}

  for (i = 3; i < 6; i++) {
    line = lines[i]
    line = line.trim().split(/\s+/)
    nDim = parseInt(line[0])
    for (j = 0; j < 3; j++) {
      voxelWidth = parseFloat(line[j+1])
      dimensionSize = nDim * voxelWidth
      if ( j == 0 ) {
        if ( dimensionSize > maxDimensions.x ) {
          maxDimensions.x = dimensionSize / 1.889725989
        }
      }
      if ( j == 1 ) {
        if ( dimensionSize > maxDimensions.y ) {
          maxDimensions.y = dimensionSize / 1.889725989
        }
      }
      if ( j == 2 ) {
        if ( dimensionSize > maxDimensions.z ) {
          maxDimensions.z = dimensionSize / 1.889725989
        }
      }

  }}

  for (i = 6; i < nAtoms + 6; i++ ) {
    line = lines[i];
    line = line.trim().split(/\s+/)
    xyz = line.splice(2)
    xyzFile += atom_numbers[line[0].toString()] + '  '
    for (j=0; j < xyz.length; j++) {
      xyz[j] /= 1.889725989
      xyzFile += xyz[j].toString() + ' '
    }
    xyzFile += "\n"
  }
  viewer.addModel(xyzFile, 'xyz')
  voldata = new $3Dmol.VolumeData(data, "cube");
  b = viewer.addIsosurface(voldata, {
    isoval: 0.01,
    color: "blue",
    alpha: 0.95,
    smoothness: 10
  });
  c = viewer.addIsosurface(voldata, {
    isoval: -0.01,
    color: "red",
    alpha: 0.95,
    smoothness: 10
  });
  viewer.setStyle({}, {stick:{radius: 0.05}});
  viewer.addStyle({}, {sphere: {radius: 0.3}})
  // viewer.zoomTo();
  //viewer.zoom(.75);
  viewer.render();
}, 'text');

// $.get(xyz, function(data) {
//   viewer.addModel(data, 'xyz')
//   viewer.render()
// })

createPlane = function(zPos, xSize) {
  // zPos = 5.0
  // xSize = 20
  vertices = [new $3Dmol.Vector3(0,0,zPos), new $3Dmol.Vector3(xSize,0,zPos), new $3Dmol.Vector3(xSize,xSize, zPos), new $3Dmol.Vector3(0, xSize, zPos)]
  normals = [new $3Dmol.Vector3(0,-1,0), new $3Dmol.Vector3(0,-1,0), new $3Dmol.Vector3(0,-1, 0), new $3Dmol.Vector3(0,-1, 0) ]
  faces = [ 0,1,2, 0, 2, 3 ]
  newShape = {vertexArr: vertices, normalArr: normals, faceArr: faces}
  planeDrawn = viewer.addCustom(newShape)
}


$('#myRange').on('change', function (data) {
  viewer.removeShape(planeDrawn)
  newZ = $('#myRange').val()/100.0 * maxDimensions.z
  createPlane(newZ,20)
  viewer.render()
})

atom_numbers = {
  '44' : 'Ru',
  '75' : 'Re',
  '104' : 'Rf',
  '111' : 'Rg',
  '88' : 'Ra',
  '37' : 'Rb',
  '86' : 'Rn',
  '45' : 'Rh',
  '4' : 'Be',
  '56' : 'Ba',
  '107' : 'Bh',
  '83' : 'Bi',
  '97' : 'Bk',
  '35' : 'Br',
  '118' : 'Og',
  '1' : 'H',
  '15' : 'P',
  '0' : 'X',
  '76' : 'Os',
  '99' : 'Es',
  '80' : 'Hg',
  '32' : 'Ge',
  '64' : 'Gd',
  '31' : 'Ga',
  '59' : 'Pr',
  '78' : 'Pt',
  '94' : 'Pu',
  '6' : 'C',
  '82' : 'Pb',
  '91' : 'Pa',
  '46' : 'Pd',
  '48' : 'Cd',
  '84' : 'Po',
  '61' : 'Pm',
  '108' : 'Hs',
  '67' : 'Ho',
  '72' : 'Hf',
  '19' : 'K',
  '2' : 'He',
  '101' : 'Md',
  '12' : 'Mg',
  '115' : 'Mc',
  '42' : 'Mo',
  '25' : 'Mn',
  '8' : 'O',
  '109' : 'Mt',
  '16' : 'S',
  '74' : 'W',
  '30' : 'Zn',
  '63' : 'Eu',
  '40' : 'Zr',
  '68' : 'Er',
  '113' : 'Nh',
  '28' : 'Ni',
  '102' : 'No',
  '11' : 'Na',
  '41' : 'Nb',
  '60' : 'Nd',
  '10' : 'Ne',
  '93' : 'Np',
  '87' : 'Fr',
  '26' : 'Fe',
  '114' : 'Fl',
  '100' : 'Fm',
  '5' : 'B',
  '9' : 'F',
  '38' : 'Sr',
  '7' : 'N',
  '36' : 'Kr',
  '14' : 'Si',
  '50' : 'Sn',
  '62' : 'Sm',
  '23' : 'V',
  '21' : 'Sc',
  '51' : 'Sb',
  '106' : 'Sg',
  '34' : 'Se',
  '27' : 'Co',
  '112' : 'Cn',
  '96' : 'Cm',
  '17' : 'Cl',
  '20' : 'Ca',
  '98' : 'Cf',
  '58' : 'Ce',
  '54' : 'Xe',
  '71' : 'Lu',
  '55' : 'Cs',
  '24' : 'Cr',
  '29' : 'Cu',
  '57' : 'La',
  '117' : 'Ts',
  '3' : 'Li',
  '116' : 'Lv',
  '81' : 'Tl',
  '69' : 'Tm',
  '103' : 'Lr',
  '90' : 'Th',
  '22' : 'Ti',
  '52' : 'Te',
  '65' : 'Tb',
  '43' : 'Tc',
  '73' : 'Ta',
  '70' : 'Yb',
  '105' : 'Db',
  '66' : 'Dy',
  '110' : 'Ds',
  '53' : 'I',
  '92' : 'U',
  '39' : 'Y',
  '89' : 'Ac',
  '47' : 'Ag',
  '77' : 'Ir',
  '95' : 'Am',
  '13' : 'Al',
  '33' : 'As',
  '18' : 'Ar',
  '79' : 'Au',
  '85' : 'At',
  '49' : 'In'
}
