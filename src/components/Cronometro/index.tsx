import Botao from "../Botao";
import Relogio from "./Relogio";
import style from './Cronometro.module.scss';
import { tempoParaSegundos } from "../../common/utils/time";
import { ITarefa } from "../../types/tarefa";
import { useEffect, useState } from "react";

interface Props {
    tarefaSelecionada: ITarefa | undefined,
    finalizarTarefa: () => void
}

export default function Cronometro({ tarefaSelecionada, finalizarTarefa } : Props) {
    const [tempo, setTempo] = useState<number>();
    
    useEffect(() => {
        if(tarefaSelecionada?.tempo) {
            setTempo(tempoParaSegundos(tarefaSelecionada.tempo));
        }
    }, [tarefaSelecionada]);

    function regressiva(contador: number = 0) {
        setTimeout(() => {
            if (contador > 0) {
                setTempo(--contador);
                return regressiva(contador);
            }
            finalizarTarefa();
        }, 1000);        
    }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            <Botao onClick={() => regressiva(tempo)} >
                Começar
            </Botao>
        </div>
    )
}