"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  RoundedBox,
  Sparkles,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  Component,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

/* ──────────────────────────────────────────────────────────────
   Materials (shared, disposed on unmount)
   ────────────────────────────────────────────────────────────── */
type Mats = ReturnType<typeof makeMats>;
const MatCtx = createContext<Mats | null>(null);
const useMats = () => useContext(MatCtx)!;

function makeMats(lite: boolean) {
  return {
    steel: new THREE.MeshStandardMaterial({ color: lite ? "#9c9c9c" : "#c4c4c4", metalness: lite ? 0.45 : 0.95, roughness: 0.3 }),
    iron: new THREE.MeshStandardMaterial({ color: "#101010", metalness: lite ? 0.3 : 0.7, roughness: 0.42 }),
    frame: new THREE.MeshStandardMaterial({ color: "#131313", metalness: lite ? 0.3 : 0.65, roughness: 0.5 }),
    gold: new THREE.MeshStandardMaterial({ color: "#c9a24a", metalness: lite ? 0.5 : 1, roughness: 0.28, emissive: "#3a2a08", emissiveIntensity: 0.6 }),
    glow: new THREE.MeshBasicMaterial({ color: "#ffd98a", toneMapped: false }),
    dim: new THREE.MeshBasicMaterial({ color: "#7a5f22", toneMapped: false }),
    rubber: new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.92, metalness: 0.1 }),
  };
}

/* ──────────────────────────────────────────────────────────────
   Props / path definition
   ────────────────────────────────────────────────────────────── */
export const STATION_COUNT = 5;

const CAM_POS: [number, number, number][] = [
  [0, 1.7, 8.5], //  0 · hero
  [-0.9, 1.35, -4.8], //  1 · strength (power rack)
  [-4.6, 1.2, -20.5], //  2 · dumbbell wall
  [3.6, 1.05, -31], //  3 · training floor
  [0, 2.3, -43], //  4 · statement
];
const CAM_LOOK: [number, number, number][] = [
  [1.1, 1.9, 0],
  [0, 1.5, -11],
  [0.4, 0.9, -24.5],
  [-0.2, 0.55, -37],
  [0, 3.0, -52],
];

/* ──────────────────────────────────────────────────────────────
   Gym equipment — built from primitives (no external assets)
   ────────────────────────────────────────────────────────────── */
function Barbell({ sets = 2, ...props }: { sets?: number } & React.ComponentProps<"group">) {
  const m = useMats();
  const plates = useMemo(() => {
    const out: { x: number; r: number }[] = [];
    for (const side of [-1, 1]) for (let i = 0; i < sets; i++) out.push({ x: side * (0.74 + i * 0.052), r: i === 0 ? 0.225 : 0.18 });
    return out;
  }, [sets]);
  return (
    <group {...props}>
      <mesh rotation={[0, 0, Math.PI / 2]} material={m.steel}>
        <cylinderGeometry args={[0.014, 0.014, 2.2, 16]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.92, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.steel}>
          <cylinderGeometry args={[0.025, 0.025, 0.46, 20]} />
        </mesh>
      ))}
      {plates.map((p, i) => (
        <group key={i} position={[p.x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={m.iron}>
            <cylinderGeometry args={[p.r, p.r, 0.042, 48]} />
          </mesh>
          <mesh material={m.gold}>
            <cylinderGeometry args={[p.r * 0.56, p.r * 0.56, 0.045, 40]} />
          </mesh>
          <mesh material={m.iron}>
            <cylinderGeometry args={[p.r * 0.46, p.r * 0.46, 0.048, 40]} />
          </mesh>
        </group>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (0.74 + sets * 0.052 + 0.02), 0, 0]} rotation={[0, 0, Math.PI / 2]} material={m.gold}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 20]} />
        </mesh>
      ))}
    </group>
  );
}

function PowerRack(props: React.ComponentProps<"group">) {
  const m = useMats();
  const ups: [number, number][] = [
    [-0.72, 0.55],
    [0.72, 0.55],
    [-0.72, -0.55],
    [0.72, -0.55],
  ];
  return (
    <group {...props}>
      {ups.map(([x, z], i) => (
        <group key={i} position={[x, 1.2, z]}>
          <mesh material={m.frame}>
            <boxGeometry args={[0.1, 2.4, 0.1]} />
          </mesh>
          {z > 0 && (
            <mesh position={[0, 0, 0.052]} material={m.glow}>
              <boxGeometry args={[0.014, 2.3, 0.006]} />
            </mesh>
          )}
        </group>
      ))}
      {[0.55, -0.55].map((z) => (
        <mesh key={z} position={[0, 2.4, z]} material={m.frame}>
          <boxGeometry args={[1.54, 0.1, 0.1]} />
        </mesh>
      ))}
      {[-0.72, 0.72].map((x) => (
        <mesh key={x} position={[x, 2.4, 0]} material={m.frame}>
          <boxGeometry args={[0.1, 0.1, 1.1]} />
        </mesh>
      ))}
      <mesh position={[0, 1.2, -0.55]} material={m.frame}>
        <boxGeometry args={[1.44, 0.07, 0.05]} />
      </mesh>
      <mesh position={[0, 2.0, -0.55]} material={m.frame}>
        <boxGeometry args={[1.44, 0.07, 0.05]} />
      </mesh>
      {[-0.72, 0.72].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.38, 0.62]} material={m.gold}>
            <boxGeometry args={[0.1, 0.05, 0.14]} />
          </mesh>
          <mesh position={[x, 0.75, 0.9]} material={m.frame}>
            <boxGeometry args={[0.07, 0.06, 0.72]} />
          </mesh>
        </group>
      ))}
      <Barbell sets={3} position={[0, 1.44, 0.62]} />
    </group>
  );
}

function DumbbellRack(props: React.ComponentProps<"group">) {
  const m = useMats();
  const n = 9;
  const items = useMemo(() => Array.from({ length: n }, (_, i) => ({ x: -1.8 + i * 0.45, r: 0.042 + i * 0.0075 })), []);
  return (
    <group {...props}>
      {[-2.15, 2.15].map((x) => (
        <mesh key={x} position={[x, 0.6, 0]} material={m.frame}>
          <boxGeometry args={[0.09, 1.2, 0.8]} />
        </mesh>
      ))}
      {[0.5, 1.02].map((y, row) => (
        <group key={y}>
          <mesh position={[0, y, 0]} rotation={[-0.1, 0, 0]} material={m.frame}>
            <boxGeometry args={[4.3, 0.04, 0.5]} />
          </mesh>
          <mesh position={[0, y - 0.01, 0.255]} material={m.glow}>
            <boxGeometry args={[4.3, 0.008, 0.008]} />
          </mesh>
          {items.map((d, i) => (
            <group key={i} position={[d.x, y + d.r + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh material={m.steel}>
                <cylinderGeometry args={[0.013, 0.013, 0.2, 12]} />
              </mesh>
              {[-1, 1].map((s) => (
                <mesh key={s} position={[0, s * 0.105, 0]} material={m.iron}>
                  <cylinderGeometry args={[d.r, d.r, 0.075, 6]} />
                </mesh>
              ))}
              {[-1, 1].map((s) => (
                <mesh key={s} position={[0, s * 0.145, 0]} material={m.gold}>
                  <cylinderGeometry args={[d.r * 0.55, d.r * 0.55, 0.006, 6]} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

function Kettlebell({ r = 0.15, ...props }: { r?: number } & React.ComponentProps<"group">) {
  const m = useMats();
  return (
    <group {...props}>
      <mesh position={[0, r, 0]} material={m.iron}>
        <sphereGeometry args={[r, 32, 24]} />
      </mesh>
      <mesh position={[0, r * 1.62, 0]} material={m.iron}>
        <torusGeometry args={[r * 0.5, r * 0.13, 12, 28, Math.PI]} />
      </mesh>
      <mesh position={[0, r * 1.15, r * 0.97]} rotation={[0.2, 0, 0]} material={m.gold}>
        <circleGeometry args={[r * 0.22, 20]} />
      </mesh>
    </group>
  );
}

function PlyoBox(props: React.ComponentProps<"group"> & { size?: [number, number, number] }) {
  const m = useMats();
  const { size = [0.9, 0.6, 0.75], ...rest } = props;
  return (
    <group {...rest}>
      <RoundedBox args={size} radius={0.03} smoothness={2} position={[0, size[1] / 2, 0]} material={m.frame} />
      <mesh position={[0, size[1] * 0.5, size[2] / 2 + 0.002]} material={m.glow}>
        <boxGeometry args={[size[0] * 0.5, 0.012, 0.004]} />
      </mesh>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────
   Environment dressing
   ────────────────────────────────────────────────────────────── */
function Corridor({ lite }: { lite: boolean }) {
  const m = useMats();
  const rows = useMemo(() => Array.from({ length: lite ? 10 : 15 }, (_, i) => 8 - i * 4.6), [lite]);
  return (
    <group>
      {rows.map((z) => (
        <group key={z} position={[0, 0, z]}>
          {[-7, 7].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 2.5, 0]} material={m.frame}>
                <boxGeometry args={[0.35, 5, 0.35]} />
              </mesh>
              <mesh position={[x > 0 ? -0.19 : 0.19, 2.5, 0]} material={m.dim}>
                <boxGeometry args={[0.02, 4.4, 0.05]} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 5.4, 0]} material={m.frame}>
            <boxGeometry args={[14.4, 0.22, 0.22]} />
          </mesh>
          <mesh position={[0, 5.28, 0]} material={m.glow}>
            <boxGeometry args={[9, 0.02, 0.05]} />
          </mesh>
        </group>
      ))}
      {[-2.9, 2.9].map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x, 0.006, -24]} material={m.dim}>
          <planeGeometry args={[0.03, 90]} />
        </mesh>
      ))}
      {/* back walls of the journey */}
      <mesh position={[0, 3, -58]} material={m.rubber}>
        <planeGeometry args={[40, 14]} />
      </mesh>
    </group>
  );
}

function Floor({ lite }: { lite: boolean }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -24]}>
      <planeGeometry args={[32, 90]} />
      {lite ? (
        <meshStandardMaterial color="#090909" roughness={0.5} metalness={0.35} />
      ) : (
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={42}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#080808"
          metalness={0.55}
          mirror={0}
        />
      )}
    </mesh>
  );
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(255,217,138,0.9)");
  grad.addColorStop(0.35, "rgba(201,162,74,0.28)");
  grad.addColorStop(1, "rgba(201,162,74,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The real supplied logo, lit with a warm glow. Never redrawn or re-proportioned. */
function Logo({ position, scale }: { position: [number, number, number]; scale: number }) {
  const tex = useTexture("/brand/logo-gold.png");
  const glow = useMemo(() => glowTexture(), []);
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return () => glow.dispose();
  }, [tex, glow]);
  const img = tex.image as HTMLImageElement | undefined;
  const aspect = img?.width && img?.height ? img.width / img.height : 1.1; // true aspect ratio of the supplied logo
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.05]} scale={[scale * 2.3, scale * 2.3, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh scale={[scale * aspect, scale, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Spot({ p, t, i }: { p: readonly [number, number, number]; t: readonly [number, number, number]; i: number }) {
  const light = useRef<THREE.SpotLight>(null!);
  const target = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    target.position.set(t[0], t[1], t[2]);
    target.updateMatrixWorld();
    light.current.target = target;
  }, [target, t]);
  return (
    <>
      <spotLight ref={light} position={[p[0], p[1], p[2]]} angle={0.55} penumbra={1} intensity={i} decay={2} color="#ffd98a" distance={26} />
      <primitive object={target} />
    </>
  );
}

function StationLights({ lite }: { lite: boolean }) {
  const spots = useMemo(
    () => [
      { p: [-1, 7, 1] as const, t: [0, 0, -1] as const, i: 520 },
      { p: [0, 6.5, -9] as const, t: [0, 1.4, -11] as const, i: 620 },
      { p: [0, 6.5, -23] as const, t: [0, 0.8, -24.5] as const, i: 620 },
      { p: [0, 6.5, -36] as const, t: [0, 0.3, -37] as const, i: 600 },
      { p: [0, 7, -48] as const, t: [0, 3, -52] as const, i: 700 },
    ],
    []
  );
  return (
    <>
      {spots.map((s, k) => (
        <Spot key={k} p={s.p} t={s.t} i={s.i} />
      ))}
      {/* cool-warm rim from behind each station for gold edge lighting */}
      {(lite ? [-3, -15, -29, -43] : [-2, -8, -15, -22, -29, -36, -43, -50]).map((z, k) => (
        <pointLight key={z} position={[k % 2 ? 4.2 : -4.2, 3.4, z]} intensity={lite ? 90 : 60} color="#ffc873" distance={17} decay={2} />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   Optional licensed athlete model
   ────────────────────────────────────────────────────────────── */
function Athlete({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);
  useEffect(() => {
    const a = actions[names[0]];
    a?.reset().fadeIn(0.4).play();
    return () => {
      a?.fadeOut(0.2);
    };
  }, [actions, names]);
  return (
    <group ref={group} position={[-0.6, 0, 1.2]}>
      <primitive object={scene} />
    </group>
  );
}

class Guard extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}

/* ──────────────────────────────────────────────────────────────
   Camera rig — scroll progress drives a spline through the gym
   ────────────────────────────────────────────────────────────── */
function CameraRig({ progress, lite }: { progress: MutableRefObject<number>; lite: boolean }) {
  const { camera, pointer } = useThree();
  const posCurve = useMemo(() => new THREE.CatmullRomCurve3(CAM_POS.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.5), []);
  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3(CAM_LOOK.map((p) => new THREE.Vector3(...p)), false, "catmullrom", 0.5), []);
  const smooth = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const lookNow = useRef(new THREE.Vector3(...CAM_LOOK[0]));

  useFrame((_, dt) => {
    smooth.current = THREE.MathUtils.damp(smooth.current, progress.current, 3.2, Math.min(dt, 0.05));
    const t = THREE.MathUtils.clamp(smooth.current, 0, 1);
    posCurve.getPoint(t, pos);
    lookCurve.getPoint(t, look);
    if (!lite) {
      pos.x += pointer.x * 0.28;
      pos.y += pointer.y * 0.12;
    }
    camera.position.copy(pos);
    lookNow.current.lerp(look, 1 - Math.exp(-6 * Math.min(dt, 0.05)));
    camera.lookAt(lookNow.current);
  });
  return null;
}

/* ──────────────────────────────────────────────────────────────
   Scene composition
   ────────────────────────────────────────────────────────────── */
function World({ progress, lite, athleteModel }: { progress: MutableRefObject<number>; lite: boolean; athleteModel: string | null }) {
  const size = useThree((s) => s.size);
  const wide = size.width / size.height > 1.1;
  const mats = useMemo(() => makeMats(lite), [lite]);
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  return (
    <MatCtx.Provider value={mats}>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 9, lite ? 38 : 48]} />
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#4a3a1c", "#050505", 0.9]} />
      {!lite && (
        <Environment resolution={256} frames={1}>
          <group rotation={[-Math.PI / 3.2, 0, 0]}>
            <Lightformer form="rect" intensity={2.2} color="#ffd98a" position={[0, 6, -4]} scale={[14, 2, 1]} />
            <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[-8, 3, 2]} scale={[2, 8, 1]} />
            <Lightformer form="rect" intensity={1.4} color="#c9a24a" position={[8, 3, -2]} scale={[2, 8, 1]} />
          </group>
        </Environment>
      )}

      <CameraRig progress={progress} lite={lite} />
      <StationLights lite={lite} />
      <Floor lite={lite} />
      <Corridor lite={lite} />

      {/* Station 0 — hero */}
      <Suspense fallback={null}>
        <Logo position={wide ? [3.5, 3.0, -2.2] : [1.1, 3.75, -3.5]} scale={wide ? 3.9 : 2.5} />
      </Suspense>
      <Barbell sets={2} position={[-2.2, 0.225, 2.2]} rotation={[0, 0.5, 0]} />
      <PowerRack position={[-5.6, 0, -4]} rotation={[0, 0.35, 0]} />
      {athleteModel && (
        <Guard>
          <Suspense fallback={null}>
            <Athlete url={athleteModel} />
          </Suspense>
        </Guard>
      )}

      {/* Station 1 — strength */}
      <PowerRack position={[0, 0, -11]} />
      <Barbell sets={3} position={[1.9, 0.225, -8.6]} rotation={[0, -0.35, 0]} />
      <PlyoBox position={[-2.6, 0, -9.2]} rotation={[0, 0.4, 0]} />

      {/* Station 2 — dumbbell wall */}
      <DumbbellRack position={[0, 0, -24.6]} />
      <DumbbellRack position={[0, 0, -27.6]} rotation={[0, Math.PI, 0]} />

      {/* Station 3 — functional / conditioning floor */}
      {[0.12, 0.14, 0.16, 0.18, 0.2].map((r, i) => (
        <Kettlebell key={i} r={r} position={[-1.8 + i * 0.9, 0, -37]} rotation={[0, i * 0.2, 0]} />
      ))}
      <PlyoBox position={[-3.4, 0, -34.6]} size={[0.9, 0.5, 0.75]} />
      <PlyoBox position={[-3.4, 0.5, -34.6]} size={[0.75, 0.4, 0.65]} />
      <PlyoBox position={[3.2, 0, -39.2]} size={[0.9, 0.75, 0.75]} rotation={[0, -0.3, 0]} />
      <Barbell sets={2} position={[1.2, 0.225, -33.2]} rotation={[0, 1.1, 0]} />

      {/* Station 4 — statement */}
      <Suspense fallback={null}>
        <Logo position={wide ? [0, 3.3, -52] : [0, 4.6, -52]} scale={wide ? 8.5 : 4.6} />
      </Suspense>

      <Sparkles count={lite ? 50 : 160} scale={[18, 6, 66]} position={[0, 3, -24]} size={2.4} speed={0.18} opacity={0.55} color="#f0d58a" noise={0.6} />
    </MatCtx.Provider>
  );
}

export default function GymScene({
  progress,
  lite,
  active,
  athleteModel,
  onError,
}: {
  progress: MutableRefObject<number>;
  lite: boolean;
  active: boolean;
  athleteModel: string | null;
  onError: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !lite, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 38, near: 0.1, far: 90, position: CAM_POS[0] }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onError();
        });
      }}
      aria-hidden
    >
      <World progress={progress} lite={lite} athleteModel={athleteModel} />
    </Canvas>
  );
}
