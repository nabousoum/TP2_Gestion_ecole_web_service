package com.nabou.matieres.endpoints;

import com.nabou.matieres.config.WebServiceConfig;
import com.nabou.matieres.services.IMatiereService;
import com.nabou.matieres.mappers.MatiereMapper;
import com.spring.training.model.*;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class MatiereEndpoint {

    private final IMatiereService matiereService;
    private final MatiereMapper matiereMapper;

    public MatiereEndpoint(IMatiereService matiereService, MatiereMapper matiereMapper) {
        this.matiereService = matiereService;
        this.matiereMapper = matiereMapper;
    }

    @PayloadRoot(namespace = WebServiceConfig.NAMESPACE_URI, localPart = "getMatieresRequest")
    @ResponsePayload
    public GetMatieresResponse getMatieres(@RequestPayload GetMatieresRequest request) {
        GetMatieresResponse response = new GetMatieresResponse();
        response.getMatieres().addAll(
                matiereMapper.toSoapMatiereList(matiereService.getAllMatieres())
        );
        return response;
    }

    @PayloadRoot(namespace = WebServiceConfig.NAMESPACE_URI, localPart = "getMatiereRequest")
    @ResponsePayload
    public GetMatiereResponse getMatiereRequest(@RequestPayload GetMatiereRequest request) {
        GetMatiereResponse response = new GetMatiereResponse();
        response.setMatiere(
                matiereMapper.toSoapMatiere(matiereService.getMatiereById(request.getId()))
        );
        return response;
    }

    @PayloadRoot(namespace = WebServiceConfig.NAMESPACE_URI, localPart = "createMatiereRequest")
    @ResponsePayload
    public CreateMatiereResponse createMatiereRequest(@RequestPayload CreateMatiereRequest request) {
        CreateMatiereResponse response = new CreateMatiereResponse();
        com.nabou.matieres.entities.Matiere entity = matiereMapper.toJpaMatiere(new com.spring.training.model.Matiere() {{
            setName(request.getName());
        }});
        response.setMatiere(
                matiereMapper.toSoapMatiere(matiereService.addMatiere(entity))
        );
        return response;
    }

    @PayloadRoot(namespace = WebServiceConfig.NAMESPACE_URI, localPart = "updateMatiereRequest")
    @ResponsePayload
    public UpdateMatiereResponse updateMatiereRequest(@RequestPayload UpdateMatiereRequest request) {
        UpdateMatiereResponse response = new UpdateMatiereResponse();
        com.nabou.matieres.entities.Matiere entity = matiereMapper.toJpaMatiere(new com.spring.training.model.Matiere() {{
            setName(request.getName());
        }});
        response.setMatiere(
                matiereMapper.toSoapMatiere(matiereService.updateMatiere(request.getId(), entity))
        );
        return response;
    }

    @PayloadRoot(namespace = WebServiceConfig.NAMESPACE_URI, localPart = "deleteMatiereRequest")
    @ResponsePayload
    public DeleteMatiereResponse deleteMatiereRequest(@RequestPayload DeleteMatiereRequest request) {
        DeleteMatiereResponse response = new DeleteMatiereResponse();
        response.setIsDeleted(matiereService.deleteMatiere(request.getId()));
        return response;
    }
}
