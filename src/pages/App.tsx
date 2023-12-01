import React, { useState } from 'react';
import Formulario from '../components/Formulario';
import Lista from '../components/Lista';
import style from './App.module.scss';
import Cronometro from '../components/Cronometro';
import { ITarefa } from '../types/tarefa';

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<ITarefa>();

  function selecionaTarefa(selecionada: ITarefa) {
    setTarefaSelecionada(selecionada);
    setTarefas(tarefasAnteriores => tarefasAnteriores.map(
      tarefa => ({
        ...tarefa,
        selecionado: tarefa.id === selecionada.id ? true : false
      })
    ));
  }

  
  function finalizarTarefa() {
    if(tarefaSelecionada) {
      setTarefaSelecionada(undefined);
      tarefaSelecionada.selecionado = false;
      tarefaSelecionada.completado = true;

      tarefas.forEach((tarefa, index) => {
        if (tarefa.id === tarefaSelecionada.id) {
          tarefas[index] = tarefaSelecionada;
        }
      });

      setTarefas(tarefas);
    }
  }
  
  return (
    <div className={style.AppStyle}>
      <Formulario setTarefas={setTarefas} />
      <Lista 
        tarefas={tarefas}
        selecionaTarefa={selecionaTarefa}
      />
      <Cronometro 
        tarefaSelecionada={tarefaSelecionada}
        finalizarTarefa={finalizarTarefa}
      />
    </div>
  );
}

export default App;
