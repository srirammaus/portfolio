import * as THREE from "three";

// Sample in object space so the surface rotates with the sphere and has no UV seam.
export function surface(kind) {
  const material = new THREE.MeshStandardMaterial({ roughness: .84 });
  material.customProgramCacheKey = () => "solar-surface-" + kind;
  material.onBeforeCompile = shader => {
    shader.vertexShader = "varying vec3 globe;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nglobe=position;");
    shader.fragmentShader = `varying vec3 globe;
      float hash3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
      float noise3(vec3 p){
        vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
          mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
      }
      float terrain(vec3 p){return .55*noise3(p)+.28*noise3(p*2.13)+.13*noise3(p*4.35)+.04*noise3(p*9.);}
    ` + shader.fragmentShader.replace("#include <color_fragment>", `#include <color_fragment>
      vec3 n=normalize(globe);float relief=terrain(n*5.2);float grain=noise3(n*94.);
      ${[
        "diffuseColor.rgb=mix(vec3(.14,.12,.11),vec3(.57,.52,.42),relief*grain+.22);",
        "vec3 sea=vec3(.012,.09,.19);vec3 land=mix(vec3(.10,.19,.09),vec3(.56,.38,.19),terrain(n*11.));diffuseColor.rgb=mix(sea,land,smoothstep(.47,.50,relief));float cloud=terrain(n*9.+vec3(0,relief*4.,0));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.86,.91,.93),smoothstep(.54,.69,cloud));",
        "diffuseColor.rgb=mix(vec3(.15,.045,.019),vec3(.76,.28,.10),smoothstep(.25,.7,relief))*(.82+.18*grain);",
        "float bands=.5+.5*sin(n.y*45.+7.*relief+1.2*sin(n.y*78.));diffuseColor.rgb=mix(vec3(.24,.108,.058),vec3(.87,.69,.49),bands*.72+.27*relief);",
        "float bands=.5+.5*sin(n.y*36.+2.*relief);diffuseColor.rgb=mix(vec3(.42,.27,.15),vec3(.88,.72,.49),bands*.42+.38);",
        "diffuseColor.rgb=mix(vec3(.99,.12,.005),vec3(1.,.87,.25),smoothstep(.27,.71,relief+.09*grain));"
      ][kind]}`);
    if(kind===5)shader.fragmentShader=shader.fragmentShader.replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance=diffuseColor.rgb*1.65;");
  };
  return material;
}
