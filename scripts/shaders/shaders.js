/***SHADER PIPELINES */


//-------------- shader obj

export const Shaders = {

    vertex: {
        vertexShader: `
            precision mediump float;

            uniform mat4 uProjectionMatrix;
            uniform mat4 uViewMatrix;

            attribute vec2 inPosition;

            varying vec2 fragCoord;

            void main ()
            {
                gl_Position = uProjectionMatrix * uViewMatrix * vec4(inPosition, 1.0, 1.0);

                fragCoord = inPosition;
            }
        `,
        vertexShader2: `
            precision mediump float;

            uniform mat4 uProjectionMatrix;
            uniform mat4 uViewMatrix;

            attribute vec2 inPosition;

            varying vec2 fragCoord;

            void main ()
            {
                gl_Position = uProjectionMatrix * uViewMatrix * vec4(inPosition, 1.0, 1.0);

                fragCoord = inPosition;
        }`,
        vertexShader5: `
            precision mediump float;

            uniform mat4 uProjectionMatrix;
            uniform mat4 uViewMatrix;

            attribute vec2 inPosition;

            varying vec2 fragCoord;

            void main ()
            {
                // gl_Position = uProjectionMatrix * uViewMatrix * vec4(inPosition, 1.0, 1.0);

                gl_Position = uProjectionMatrix * uViewMatrix * vec4(100.5, 0.1, 1.0, 1.0);

                // gl_Position = vec4(inPosition, 1.0, 1.0);

                fragCoord = inPosition;
            }
        `,
    },
    frag: {
        wave: `
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform float time;
            uniform vec2 resolution;

            void main( void ) {
                vec2 pos1=gl_FragCoord.xy/resolution.x-vec2(0.35,resolution.y/resolution.x/2.0);
                float l1=length(pos1);
                float l2=step(0.5,fract(1.0/l1+time/1.0));
                float a=step(0.2,fract(0.1*sin(15.*l1+time*1.)/l1+atan(pos1.x,pos1.y)*2.));
                if(a!=l2 && l1>0.02){
                    gl_FragColor=vec4(1.0,1.0,1.0,1.0);
                }
            }
        `,
        fragmentShader: `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;

            varying vec2 fragCoord;

            void main (void)
            {
                // Normalized pixel coordinates (from 0 to 1)
                vec2 uv = fragCoord / resolution.xy;

                // Time varying pixel color
                // vec3 col = cos(uv.xyx + vec3(0, 2, 4));
                vec3 col = uv.xyx;

                gl_FragColor = vec4(col, 1.0);
            }
        `,
        fragmentShader2: `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;

            varying vec2 fragCoord;

            vec3 hsv2rgb (vec3 c)
            {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }

            void main (void)
            {
                vec2 gg = fragCoord.xy;
                float bins = 10.0;
                vec2 pos = (gg / resolution.xy);

                float bin = floor(pos.x * bins);

                gl_FragColor = vec4(hsv2rgb(vec3(bin / bins, 1.0, 1.0)), 1.0);
            }
        `,
        plasmaMask: 
            `precision highp float;

            uniform float time;
            // uniform vec2 resolution;
            
            void main( void ) {
            
                vec2 resolution = vec2(800.0, 600.0);
            
                vec2 position = ( gl_FragCoord.xy / resolution.xy );
            
                float color = 0.0;
                color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
                color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
                color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
                color *= sin( time / 10.0 ) * 0.5;
            
                
                gl_FragColor = vec4( vec3( sin( color + time / 3.0 ) * 0.75, sin( color + time / 3.0 ) * 0.75, sin( color + time / 3.0 ) * 0.75 ), 1.0 );
            
        }`,
        hueTunnel:
            `precision mediump float;

            vec2 iResolution = vec2(800.0, 600.0);
            
            vec2 iMouse = vec2(400.0, 300.0);
            
            uniform float iGlobalTime;
            
            vec3 hue(vec3 color, float shift) {
            
                const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
                const vec3  kRGBToI     = vec3 (0.596, -0.275, -0.321);
                const vec3  kRGBToQ     = vec3 (0.212, -0.523, 0.311);
            
                const vec3  kYIQToR   = vec3 (1.0, 0.956, 0.621);
                const vec3  kYIQToG   = vec3 (1.0, -0.272, -0.647);
                const vec3  kYIQToB   = vec3 (1.0, -1.107, 1.704);
            
                // Convert to YIQ
                float   YPrime  = dot (color, kRGBToYPrime);
                float   I      = dot (color, kRGBToI);
                float   Q      = dot (color, kRGBToQ);
            
                // Calculate the hue and chroma
                float   hue     = atan (Q, I);
                float   chroma  = sqrt (I * I + Q * Q);
            
                // Make the user's adjustments
                hue += shift;
            
                // Convert back to YIQ
                Q = chroma * sin (hue);
                I = chroma * cos (hue);
            
                // Convert back to RGB
                vec3    yIQ   = vec3 (YPrime, I, Q);
                color.r = dot (yIQ, kYIQToR);
                color.g = dot (yIQ, kYIQToG);
                color.b = dot (yIQ, kYIQToB);
            
                return color;
            }
            
            float sdBox( vec3 p, vec3 b )
            {
            vec3 d = abs(p) - b;
            return min(max(d.x,max(d.y,d.z)),0.0) +
                    length(max(d,0.0));
            }
            
            float sdCappedCylinder( vec3 p, vec2 h ) {
            vec2 d = abs(vec2(length(p.xy),p.z)) - h;
            return min(max(d.x,d.y),0.0) + length(max(d,0.0));
            }
            
            float opS( float d1, float d2 )
            {
                return max(-d1,d2);
            }
            
            float sdOcta( vec3 p, float h, float w ){
                p.xz = abs(p.xz);
                p.y = abs(p.y)-h;
                return max(p.z,p.x)+(p.y*w);    
            }
            
            vec2 map( in vec3 pos )
            {
                pos.x += sin(pos.z+25.0+iGlobalTime)*0.2;
                pos.y += cos(pos.z+25.0+iGlobalTime)*0.2;
                
                float size = .33;
                vec3 p = abs(mod(pos.xyz+size,size*2.)-size);
                float box = sdBox( p, vec3(.3));
                float cyl = sdCappedCylinder( p, vec2(.31, .32));
                
                vec2  res = vec2(opS(cyl, box) ,1.5); 
                
                return res;
            }
            
            vec2 castRay( in vec3 ro, in vec3 rd )
            {
                float tmin = 0.0;
                float tmax = 60.0;
                
            #if 0
                float tp1 = (0.0-ro.y)/rd.y; if( tp1>0.0 ) tmax = min( tmax, tp1 );
                float tp2 = (1.6-ro.y)/rd.y; if( tp2>0.0 ) { if( ro.y>1.6 ) tmin = max( tmin, tp2 );
                                                            else           tmax = min( tmax, tp2 ); }
            #endif
                
                float t = tmin;
                float m = -1.0;
                for( int i=0; i<60; i++ )
                {
            vec2 res = map( ro+rd*t );
                    if(  t>tmax ) break;
                    t += res.x;
            m = res.y;
                }
            
                if( t>tmax ) m=-1.0;
                return vec2( t, m );
            }
            
            vec3 calcNormal( in vec3 pos )
            {
            vec3 eps = vec3( 0.01, 0.0, 0.0 );
            vec3 nor = vec3(
            map(pos+eps.xyy).x - map(pos-eps.xyy).x,
            map(pos+eps.yxy).x - map(pos-eps.yxy).x,
            map(pos+eps.yyx).x - map(pos-eps.yyx).x );
            return normalize(nor);
            }
            
            float calcAO( in vec3 pos, in vec3 nor )
            {
            float occ = 0.0;
                float sca = 1.0;
                for( int i=0; i<5; i++ )
                {
                    float hr = 0.01 + 0.12*float(i)/4.0;
                    vec3 aopos =  nor * hr + pos;
                    float dd = map( aopos ).x;
                    occ += -(dd-hr)*sca;
                    sca *= .95;
                }
                return clamp( 1.0 - 3.0*occ, 0.0, 1.0 );    
            }
            
            
            
            
            vec3 render( in vec3 ro, in vec3 rd )
            { 
                vec3 col = vec3(0.0, 0.0, 0.0);
                vec2 res = castRay(ro,rd);
                float t = res.x;
                float m = res.y;
                
                if( m>-0.5 )
                {
                    vec3 pos = ro + t*rd;
                    vec3 nor = calcNormal( pos );
                    vec3 ref = reflect( rd, nor );
                    
                    // material        
                    float occ = calcAO( pos, nor );
                    col = hue(vec3(0.0,1.0,1.0),iGlobalTime+pos.z)*occ;
                }
            
            return vec3( clamp(col,0.0,1.0) );
            }
            
            mat3 setCamera( in vec3 ro, in vec3 ta, float cr )
            {
            vec3 cw = normalize(ta-ro);
            vec3 cp = vec3(sin(cr), cos(cr),0.0);
            vec3 cu = normalize( cross(cw,cp) );
            vec3 cv = normalize( cross(cu,cw) );
                return mat3( cu, cv, cw );
            }
            
            void main()
            {
                mainImage();
            }
            
            void mainImage( out vec4 fragColor, in vec2 fragCoord )
            {
                vec2 q = fragCoord.xy/iResolution.xy;
                vec2 p = -1.0+2.0*q;
                p.x *= iResolution.x/iResolution.y;
                vec2 mo = iMouse.xy/iResolution.xy;
            
                // camera
                vec3 ro = vec3(0., 0.,iGlobalTime );
                
                vec3 ta = ro+vec3( 0., 0.,1. );
                
                // camera-to-world transformation
                mat3 ca = setCamera( ro, ta, 0. );
            
                // ray direction
                vec3 rd = ca * normalize(vec3(p.xy,1.5));
            
                // render
                vec3 col = render( ro, rd );
            
                fragColor=vec4( col, 1.0 );
        }`,
        checkers: 
        `   precision mediump float;

            uniform float time;
            // uniform vec2 resolution;
            
            void main( void ) {
                
                vec2 resolution = vec2(800.0, 600.0);
            
                vec2 pos = ( gl_FragCoord.xy / resolution.xy ) - vec2(0.5,0.5); 
                    float horizon = 0.7;
                    float fov = 0.6; 
                float scaling = 0.2;
                float t = cos(time) / 6.0;
                
                mat2 rot = mat2(cos(t),sin(t),sin(t),cos(t)); // rot 2d pos ;
                
                pos  *=rot;
                
                vec3 p = vec3(pos.x, fov, pos.y - horizon);      
                vec2 s = vec2(p.x/p.z, p.y/p.z) * scaling;
                
                s.xy *=rot;
                
                float dupa = 4.0;
                float color = 1.0;
            
                if(pos.y < 1.1)
                
                color = sign((mod(s.x, 0.1) - 0.05) * (mod(s.y + dupa * mod(-time * 0.05, 1.0), 0.1) - 0.05));
                color *= p.z*p.z*14.0;
                
                    gl_FragColor = vec4( 0.5-p.y,0.2,0.6, 1.0 );
                
                //fading 2 black 
            
                vec4 c = vec4(0,0,0,1);
                gl_FragColor = c;
            
                gl_FragColor += vec4( vec3(color), 1.0 );
            
        }`,
        flareShader: `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;

            varying vec2 fragCoord;

            void main (void)
            {
                float intensity = 0.;

                for (float i = 0.; i < 54.; i++)
                {
                    float angle = i/27. * 3.14159;
                    vec2 xy = vec2(0.27 * cos(angle), 0.27 * sin(angle));
                    xy += fragCoord.xy/resolution.y-0.5;
                    intensity += pow(1000000., (0.77 - length(xy) * 1.9) * (1. + 0.275 * fract(-i / 27. - time))) / 80000.;
                }

                gl_FragColor = vec4(clamp(intensity * vec3(0.0777, 0.196, 0.27), vec3(0.), vec3(1.)), 0.);
            }
        `,
        fireShader: 
            `
            #ifdef GL_ES
            precision mediump float;
            #endif

            // Yuldashev Mahmud Effect took from shaderToy mahmud9935@gmail.com

            uniform float time;
            uniform vec2 mouse;
            uniform vec2 resolution;

            float snoise(vec3 uv, float res)
            {
                const vec3 s = vec3(1e0, 1e2, 1e3);
                
                uv *= res;
                
                vec3 uv0 = floor(mod(uv, res))*s;
                vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
                
                vec3 f = fract(uv); f = f*f*(3.0-2.0*f);

                vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
                            uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);

                vec4 r = fract(sin(v*1e-1)*1e3);
                float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);
                float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                return mix(r0, r1, f.z)*2.-1.;
            }

            void main( void ) {

                vec2 p = -.5 + gl_FragCoord.xy / resolution.xy;
                p.x *= resolution.x/resolution.y;
                
                float color = 2.0 - (3.*length(2.*p));
                
                vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);
                
                for(int i = 1; i <= 10; i++)
                {
                    float power = pow(2.0, float(i));
                    color += (2.5 / power) * snoise(coord + vec3(0.,-time*.08, time*.01), power*16.);
                }
                gl_FragColor = vec4( color, pow(max(color,0.),1.)*0.4, pow(max(color,0.),2.)*0.15 , color);
            }
        `,
        disco: `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;

            varying vec2 fragCoord;

            void main (void)
            {
                float ss = 0.1;
                vec2 gg = fragCoord.xy;
                gg = ceil(gg / ss) * ss;

                vec2 uv =  (gg -.5 * resolution.xy) / resolution.y ;

                if (ss<0.0)
                    uv = abs(uv);

                float t = time * .1;

                vec3 ro = vec3(0, 0, -1);
                    vec3 lookat = vec3(0.0);
                    float zoom = .1 + abs( sin(t))/5.;

                    vec3 f = normalize(lookat-ro),
                    r = normalize(cross(vec3(0,1,0), f)),
                    u = cross(r, f),
                    c = ro + f * zoom,
                    i = c + uv.x * r + uv.y * u,
                    rd = normalize(i-ro);

                    float radius = mix(.3, 1.5, .5+.5);

                    float dS, dO;
                    vec3 p;

                    for(int i=0; i<2000; i++) {
                        p = ro + rd * dO;
                        dS = -(length(vec2(length(p.xz)-1., p.y)) - .15);
                        if(dS<.0001) break;
                        dO += dS;
                }

                vec3 col = vec3(0);
                vec3 col2 = vec3(0);

                if(dS<.001) {
                    float x = atan(p.x, p.z)+t*.5;          // -pi to pi
                    float y = atan(length(p.xz)-1., p.y);

                   
                    float ripples = sin((x*10.-y*10.)*3.)*.5+.5;
                    float waves = sin(x*2.-y*4.+t*20.);
                    float custom = sin(x*5.-y*9.+t*40.);

                    float b1 = smoothstep(-.2, .2, custom);
                    float b2 = smoothstep(-.2, .2, custom-.5);
                    float b3 = smoothstep(-.5, .3, custom);

                    float m = b1*(1.-b2);
                    m = max(m, ripples*b2*max(0., waves));
                    m += max(0., waves*.3*b2);

                    float z = b1*(1.-b2);
                    z = max(m, ripples*b2*max(0., custom));
                    z += max(0., custom*.3*b2);

                    col += m;
                    col.rb *= 2.5;
                    col.z *= 2.5*abs(cos(t));

                    col2 += m;
                    col2.rb *= 5.5;
                    col2.z *= 5.2*abs(cos(t));
                }

                gl_FragColor = vec4( col2, 0.5 );
            }
        `,
        disco2: 
        `
        precision mediump float;

        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;

        varying vec2 fragCoord;

        void main (void)
        {
            float ss = 0.1;
            vec2 gg = fragCoord.xy;
            gg = ceil(gg / ss) * ss;

            vec2 uv =  (gg -.5 * resolution.xy) / resolution.y ;

            if (ss<0.0)
                uv = abs(uv);

            float t = time * .2;

            vec3 ro = vec3(0, 0, -1);
                vec3 lookat = vec3(0.0);
                float zoom = .1 + abs( sin(t))/5.;

                vec3 f = normalize(lookat-ro),
                r = normalize(cross(vec3(0,1,0), f)),
                u = cross(f, r),
                c = ro + f * zoom,
                i = c + uv.x * r + uv.y * u,
                rd = normalize(i-ro);

                float radius = mix(.3, 1.5, .5+.5);

                float dS, dO;
                vec3 p;

                for(int i=0; i<1000; i++) {
                    p = ro + rd * dO;
                    dS = -(length(vec2(length(p.xz)-1., p.y)) - .15);
                    if(dS<.0001) break;
                    dO += dS;
            }

            vec3 col = vec3(0);

            if(dS<.001) {
                float x = atan(p.x, p.z)+t*.5;          // -pi to pi
                float y = atan(length(p.xz)-1., p.y);

                float bands = sin(y*10.+x*30.);
                float ripples = sin((x*10.-y*30.)*3.)*.5+.5;
                float waves = sin(x*2.-y*6.+t*20.);

                float b1 = smoothstep(-.2, .2, bands);
                float b2 = smoothstep(-.2, .2, bands-.5);

                float m = b1*(1.-b2);
                m = max(m, ripples*b2*max(0., waves));
                m += max(0., waves*.3*b2);

                col += m;
            col.rb *= 2.5;
            col.z *= 2.5*abs(cos(t));
            }

            gl_FragColor = vec4( col, 0.5 );
        }



        `,
        fragmentShader5: `
            precision mediump float;

            uniform float time;

            varying vec2 fragCoord;

            void main() {

                vec2 p = - 1.0 + 2.0 * fragCoord;
                float a = time * 40.0;
                float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

                e = 400.0 * ( p.x * 0.5 + 0.5 );
                f = 400.0 * ( p.y * 0.5 + 0.5 );
                i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
                d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
                r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
                q = f / r;
                e = ( r * cos( q ) ) - a / 2.0;
                f = ( r * sin( q ) ) - a / 2.0;
                d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
                h = ( ( f + d ) + a / 2.0 ) * g;
                i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
                h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
                h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
                i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
                i = mod( i / 5.6, 256.0 ) / 64.0;
                if ( i < 0.0 ) i += 4.0;
                if ( i >= 2.0 ) i = 4.0 - i;
                d = r / 350.0;
                d += sin( d * d * 8.0 ) * 0.52;
                f = ( sin( a * g ) + 1.0 ) / 2.0;
                gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );
            }
        `,
        warpShader: `
            precision mediump float;

            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;

            varying vec2 fragCoord;

            void main() {

                vec2 position = ( fragCoord.xy / resolution.xy ) + mouse / 4.0;

                float color = 0.0;
                color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
                color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
                color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
                color *= sin( time / 1.0 ) * 0.5;

                gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );

            }
        `,
        fragVortex: `
            #ifdef GL_ES
            precision mediump float;
            #endif



            uniform float time;
            uniform vec2 mouse;
            uniform vec2 resolution;

            float snoise(vec3 uv, float res) {
                const vec3 s = vec3(1e0, 1e2, 1e3);

                uv *= res;

                vec3 uv0 = floor(mod(uv, res)) * s;
                vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;

                vec3 f = smoothstep(0.0, 1.0, fract(uv));

                vec4 v = vec4(uv0.x + uv0.y + uv0.z,
                        uv1.x + uv0.y + uv0.z,
                        uv0.x + uv1.y + uv0.z,
                        uv1.x + uv1.y + uv0.z);

                vec4 r = fract(sin(v * 1e-1) * 1e3);
                float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

                r = fract(sin((v + uv1.z - uv0.z) * 1e-1) * 1e3);
                float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

                return mix(r0, r1, f.z) * 2.0 - 1.0;
            }

            void main() {
                vec2 p = -0.5 + gl_FragCoord.xy / resolution.xy;
                p.x *= resolution.x / resolution.y;
                float lp = .02/length(p);
                float ap = atan(p.x, p.y);

                float time = time*.04-pow(time, .8)*(1. + .1*cos(time*0.04))*2.;

                float r1 = 0.2;
                if(lp <= r1){
                    ap -= time*0.1+lp*9.;
                    lp = sqrt(1.-lp/r1)*0.5;
                }else{
                    ap += time*0.1+lp*2.;
                    lp -= r1;
                }

                lp = pow(lp*lp, 1./3.);

                p = lp*vec2(sin(ap), cos(ap));

                float color = 5.0 - (6.0 * lp);

                vec3 coord = vec3(atan(p.x, p.y) / 6.2832 + 0.5, 0.4 * lp, 0.5);

                float power = 2.0;
                for (int i = 0; i < 6; i++) {
                    power *= 2.0;
                    color += (1.5 / power) * snoise(coord + vec3(0.0, -0.05 * time*2.0, 0.01 * time*2.0), 16.0 * power);
                }
                color = max(color, 0.0);
                float c2 = color * color;
                float c3 = color * c2;
                vec3 fc = vec3(color * 0.34, c2*0.15, c3*0.85);
                float f = fract(time);
                //fc *= smoothstep(f-0.1, f, length(p)) - smoothstep(f, f+0.1, length(p));
                gl_FragColor = vec4(length(fc)*vec3(1,02,0)*0.04, 1.0);
            }
        `,
        fragPortal: `
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform float time;
            uniform vec2 mouse; 
            uniform vec2 resolution;

            float snoise(vec3 uv, float res) {
                const vec3 s = vec3(1e0, 1e2, 1e3);

                uv *= res;

                vec3 uv0 = floor(mod(uv, res)) * s;
                vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;

                vec3 f = smoothstep(0.0, 1.0, fract(uv));

                vec4 v = vec4(uv0.x + uv0.y + uv0.z,
                        uv1.x + uv0.y + uv0.z,
                        uv0.x + uv1.y + uv0.z,
                        uv1.x + uv1.y + uv0.z);

                vec4 r = fract(sin(v * 1e-1) * 1e3);
                float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

                r = fract(sin((v + uv1.z - uv0.z) * 1e-1) * 1e3);
                float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

                return mix(r0, r1, f.z) * 2.0 - 1.0;
            }

            void main() {
                vec2 p = -0.5 + gl_FragCoord.xy / resolution.xy;
                p.x *= resolution.x / resolution.y;
                float lp = .02/length(p);
                float ap = atan(p.x, p.y);

                float time = time*.04-pow(time, .8)*(1. + .1*cos(time*0.04))*2.;

                float r1 = 0.2;
                if(lp <= r1){
                    ap -= time*0.1+lp*9.;
                    lp = sqrt(1.-lp/r1)*0.5;
                }else{
                    ap += time*0.1+lp*2.;
                    lp -= r1;
                }

                lp = pow(lp*lp, 1./3.);

                p = lp*vec2(sin(ap), cos(ap));

                float color = 3.0 - (6.0 * lp);

                vec3 coord = vec3(atan(p.x, p.y) / 6.2832 + 0.5, 0.4 * lp, 0.5);

                float power = 2.0;
                for (int i = 0; i < 6; i++) {
                    power *= 2.0;
                    color += (1.5 / power) * snoise(coord + vec3(0.0, -0.05 * time*2.0, 0.01 * time*2.0), 16.0 * power);
                }
                color = max(color, 0.0);
                float c2 = color * color;
                float c3 = color * c2;
                vec3 fc = vec3(color * 0.34, c2*0.15, c3*0.85);
                float f = fract(time);
                //fc *= smoothstep(f-0.1, f, length(p)) - smoothstep(f, f+0.1, length(p));
                gl_FragColor = vec4(length(fc)*vec3(1,02,0)*0.04, 1.0);
            }
        `
    }
}
//----variable to apply to pipeline shaders
    let fragShader;


// -------------------------- change colors / renders on scene

export class HueRotatePostFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{
    constructor (game)
    {
        fragShader = `
        #define SHADER_NAME HUE_ROTATE_FS
    
        precision mediump float;
    
        uniform sampler2D uMainSampler;
        uniform float uTime;
        uniform float uSpeed;
    
        varying vec2 outTexCoord;
    
        void main()
        {
            float c = cos(uTime * uSpeed);
            float s = sin(uTime * uSpeed);
    
            mat4 r = mat4(0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.0,  0.0, 0.0, 1.0);
            mat4 g = mat4(0.701, -0.587, -0.114, 0.0, -0.299, 0.413, -0.114, 0.0, -0.300, -0.588, 0.886, 0.0, 0.0, 0.0, 0.0, 0.0);
            mat4 b = mat4(0.168, 0.330, -0.497, 0.0, -0.328, 0.035, 0.292, 0.0, 1.250, -1.050, -0.203, 0.0, 0.0, 0.0, 0.0, 0.0);
    
            mat4 hueRotation = r + g * c + b * s;
    
            gl_FragColor = texture2D(uMainSampler, outTexCoord) * hueRotation;
        }
        `;
        super({
            game,
            name: 'HueRotatePostFX',
            fragShader,
            uniforms: [
                'uMainSampler',
                'uTime',
                'uSpeed'
            ]
        });

        this.speed = 1;
    }

    onPreRender ()
    {
        this.setTime('uTime');
        this.set1f('uSpeed', this.speed);
    }
}

//-----------------------------------------  water shader / renders on scene

export class PlasmaPost2FX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{
    constructor (game)
    {
        fragShader = `
            #define SHADER_NAME PLASMA_2_FS
            
            precision mediump float;
            
            uniform float     uTime;
            uniform vec2      uResolution;
            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            
            #define MAX_ITER 4
            
            void main( void )
            {
                vec2 v_texCoord = gl_FragCoord.xy / uResolution; 
            
                vec2 p =  v_texCoord * 8.0 - vec2(20.0);
                vec2 i = p;
                float c = 1.0;
                float inten = .05;
            
                for (int n = 0; n < MAX_ITER; n++)
                {
                    float t = uTime * (1.0 - (3.0 / float(n+1)));
            
                    i = p + vec2(cos(t - i.x) + sin(t + i.y),
                    sin(t - i.y) + cos(t + i.x));
            
                    c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),
                    p.y / (cos(i.y+t)/inten)));
                }
            
                c /= float(MAX_ITER);
                c = 1.5 - sqrt(c);
            
                vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);
            
                texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));
                vec4 pixel = texture2D(uMainSampler, outTexCoord);
            
                gl_FragColor = pixel + texColor;
            }
            `;
        super({
            game,
            renderTarget: true,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler',
                'uTime',
                'uResolution'
            ]
        });
    }

    onBoot ()
    {
        this.set2f('uResolution', this.renderer.width, this.renderer.height);
    }

    onPreRender ()
    {
        this.set1f('uTime', this.game.loop.time / 1000);
    }
}

//----------------------------------------  renders hue rotation on sprite

export class MultiPipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline
{
    constructor (game)
    {
        fragShader = `
        
        precision mediump float;

        uniform sampler2D uMainSampler[%count%];
        uniform vec2 uResolution;
        uniform float uTime;

        varying vec2 outTexCoord;
        varying float outTexId;
        varying vec4 outTint;

        vec4 plasma()
        {
            vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;
            float freq = 0.8;
            float value =
                sin(uTime + pixelPos.x * freq) +
                sin(uTime + pixelPos.y * freq) +
                sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);

            return vec4(
                cos(value),
                sin(value),
                sin(value * 3.14 * 4.0),
                cos(value)
            );
        }

        void main()
        {
            vec4 texture;

            %forloop%

            texture *= vec4(outTint.rgb * outTint.a, outTint.a);

            gl_FragColor = texture * plasma();
        }`,
        
        super({
            game,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uViewMatrix',
                'uModelMatrix',
                'uMainSampler',
                'uResolution',
                'uTime'
            ]
        });
    }
    onBoot ()
    {
        this.set2f('uResolution', this.renderer.width, this.renderer.height);
    }

    onPreRender ()
    {
        this.set1f('uTime', this.game.loop.time / 2000);
    }
}







//let shader = System.Process.app.shaders.post.plasma   
        // let shader = scene.make.shader({
        //     key: System.Process.app.shaders.base.disco2,
        //     x: 300,
        //     y: 300,
        //     width: 300,
        //     height: 300,
        //     add: true
        // })   ,         
        // mask = shader.createBitmapMask(); mask//.setMask(mask);




















