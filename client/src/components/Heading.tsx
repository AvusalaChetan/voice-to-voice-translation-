import type {JSX} from "react";

const Heading = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
        Live text translation
      </div>
      <div className="flex flex-col gap-3">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white"
          style={{fontFamily: '"Fraunces", serif'}}
        >
          Text to Voice Translate
        </h1>
      </div>
    </div>
  );
};

export default Heading;
