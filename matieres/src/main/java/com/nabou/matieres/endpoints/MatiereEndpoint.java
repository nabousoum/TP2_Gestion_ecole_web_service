package com.nabou.matieres.endpoints;

import com.nabou.matieres.entities.Matiere;
import com.nabou.matieres.repositories.MatiereRepository;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class MatiereEndpoint {

    private static final String NAMESPACE_URI = "http://example.com/matieres";
    private final MatiereRepository matiereRepository;

    public MatiereEndpoint(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

//    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMatiereRequest")
//    @ResponsePayload
//    public GetMatiereResponse getMatiere(@RequestPayload GetMatiereRequest request) {
//        Matiere matiere = matiereRepository.findById(request.getId()).orElseThrow(() -> new RuntimeException("Matiere not found"));
//        GetMatiereResponse response = new GetMatiereResponse();
//        response.setMatiere(matiere);
//        return response;
//    }
}
